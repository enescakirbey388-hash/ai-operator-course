"""Optional, standard-library-only lesson router and local progress store.

No network, subprocesses, package installation or home-directory access.
The Markdown coach also works without Python. Paths are relative to the package.
"""
from __future__ import annotations
import argparse
from contextlib import contextmanager
from datetime import datetime, timezone
import json
import os
from pathlib import Path
import re
import tempfile
import uuid


class CourseError(ValueError):
    pass


def package_root(path):
    root = Path(path).resolve()
    for candidate in (root, root / 'studentenpakket-v16'):
        if (candidate / 'interactief/lessen.json').is_file():
            return candidate
    raise CourseError('Open de volledig uitgepakte cursusmap.')


class Course:
    def __init__(self, root):
        self.root = package_root(root)
        self.catalog = json.loads((self.root / 'interactief/lessen.json').read_text(encoding='utf-8'))
        self.lessons = self.catalog['lessons']
        self.by_code = {item['code']: item for item in self.lessons}
        self.state_dir = self.root / '.lio'
        self.state_file = self.state_dir / 'progress.json'

    def resolve(self, query):
        query = re.sub(r'^start\s+les\s+', '', str(query).strip(), flags=re.I).strip()
        if query.isascii() and query.isdigit():
            matches = [l for l in self.lessons if l['number'] == int(query)]
        else:
            matches = [l for l in self.lessons if l['code'].casefold() == query.casefold()]
        if len(matches) != 1:
            raise CourseError('Onbekende les. Gebruik een nummer 1–113 of een bestaande code, zoals N28.')
        return matches[0]

    def _local(self, relative):
        path = Path(relative)
        if path.is_absolute() or '\\' in str(relative) or ':' in str(relative):
            raise CourseError('Gebruik een relatief pad binnen de cursusmap.')
        target = (self.root / path).resolve()
        if not target.is_relative_to(self.root):
            raise CourseError('Het pad valt buiten de cursusmap.')
        return target

    def read(self):
        self._local('.lio/progress.json')
        if not self.state_file.exists():
            return {'schema_version': 1, 'course': self.catalog['course'],
                    'course_version': self.catalog['version'], 'revision': 0,
                    'active_lesson': None, 'return_to': None, 'lessons': {}}
        try:
            state = json.loads(self.state_file.read_text(encoding='utf-8'))
            if state['schema_version'] != 1 or state['course'] != self.catalog['course']:
                raise ValueError('onbekende versie of cursus')
            if type(state['revision']) is not int or state['revision'] < 0 or not isinstance(state['lessons'], dict):
                raise ValueError('ongeldige voortgang')
            if state.get('active_lesson') is not None and state['active_lesson'] not in self.by_code:
                raise ValueError('onbekende actieve les')
            for code, item in state['lessons'].items():
                if code not in self.by_code or not isinstance(item, dict):
                    raise ValueError('onbekende les')
                if item['status'] not in ('not_started', 'in_progress', 'blocked', 'completed'):
                    raise ValueError('onbekende status')
                if type(item['step']) is not int or not 1 <= item['step'] <= self.by_code[code]['steps']:
                    raise ValueError('ongeldige stap')
                if not re.fullmatch(r'[A-Za-z0-9_-]+', item['run_id']):
                    raise ValueError('ongeldige run-ID')
                if not isinstance(item.get('outputs', []), list):
                    raise ValueError('ongeldige outputs')
                for output in item.get('outputs', []):
                    self._local(output)
            return state
        except (ValueError, KeyError, TypeError, AttributeError) as exc:
            raise CourseError('Voortgang is beschadigd; origineel behouden. Zie interactief/VOORTGANG.md.') from exc

    def resume(self):
        state = self.read()
        code = state['active_lesson']
        if not code:
            return {'lesson': self.lessons[0], 'step': 1, 'status': 'not_started'}
        item = state['lessons'].get(code)
        if item is None:
            raise CourseError('Actieve les mist voortgang; herstel eerst de voortgang.')
        return {'lesson': self.by_code[code], **item}

    @contextmanager
    def _lock(self):
        self._local('.lio/progress.lock')
        self.state_dir.mkdir(exist_ok=True)
        lock = self.state_dir / 'progress.lock'
        try:
            fd = os.open(lock, os.O_CREAT | os.O_EXCL | os.O_WRONLY, 0o600)
        except FileExistsError as exc:
            raise CourseError('Een andere sessie werkt de voortgang bij. Lees opnieuw; verwijder geen actieve lock.') from exc
        try:
            os.close(fd)
            yield
        finally:
            lock.unlink()

    def _atomic(self, target, content):
        self._local(target.relative_to(self.root).as_posix())
        fd, tmp = tempfile.mkstemp(prefix='progress-', suffix='.tmp', dir=self.state_dir)
        try:
            with os.fdopen(fd, 'w', encoding='utf-8') as stream:
                stream.write(content)
                stream.flush()
                os.fsync(stream.fileno())
            os.replace(tmp, target)
        finally:
            if os.path.exists(tmp):
                os.unlink(tmp)

    def save_step(self, query, step, expected_revision, *, status='in_progress',
                  outputs=None, checked=None, next_action='', restart=False):
        lesson = self.resolve(query)
        if type(step) is not int or not 1 <= step <= lesson['steps']:
            raise CourseError('Stap valt buiten deze les.')
        if status not in ('in_progress', 'blocked', 'completed'):
            raise CourseError('Ongeldige status.')
        if outputs is not None:
            for output in outputs:
                if not self._local(output).exists():
                    raise CourseError('Output bestaat niet: ' + str(output))
        if status == 'completed' and (step != lesson['steps'] or not checked or not outputs):
            raise CourseError('Afronden vraagt de laatste stap, bestaande output en vastgelegde controles.')
        with self._lock():
            state = self.read()
            if expected_revision != state['revision']:
                raise CourseError('Voortgang gewijzigd door andere sessie. Lees opnieuw en voeg jouw wijziging samen.')
            previous = json.dumps(state, ensure_ascii=False, indent=2) + '\n'
            old = state['lessons'].get(lesson['code'], {})
            if old.get('status') == 'completed' and status != 'completed' and not restart:
                raise CourseError('Les al afgerond. Gebruik bewust een nieuwe run om opnieuw te beginnen.')
            item = dict(old)
            if restart and old:
                history = list(old.get('previous_runs', []))
                history.append({k: v for k, v in old.items() if k != 'previous_runs'})
                item = {'previous_runs': history}
            item.setdefault('run_id', datetime.now(timezone.utc).strftime('%Y%m%d-%H%M%S-') + uuid.uuid4().hex[:8])
            item.update(status=status, step=step, next_action=next_action,
                        updated_at=datetime.now(timezone.utc).isoformat())
            item['outputs'] = list(outputs if outputs is not None else item.get('outputs', []))
            item['checked'] = list(checked if checked is not None else item.get('checked', []))
            state['lessons'][lesson['code']] = item
            state['active_lesson'] = lesson['code']
            state['revision'] += 1
            state['course_version'] = self.catalog['version']
            if self.state_file.exists():
                self._atomic(self.state_dir / 'progress.previous.json', previous)
            self._atomic(self.state_file, json.dumps(state, ensure_ascii=False, indent=2) + '\n')
            return state


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root', default='.')
    subs = parser.add_subparsers(dest='command', required=True)
    show = subs.add_parser('lesson'); show.add_argument('query')
    subs.add_parser('resume')
    subs.add_parser('status')
    update = subs.add_parser('save')
    update.add_argument('query'); update.add_argument('--step', type=int, required=True)
    update.add_argument('--revision', type=int, required=True)
    update.add_argument('--status', choices=['in_progress', 'blocked', 'completed'], default='in_progress')
    update.add_argument('--output', action='append')
    update.add_argument('--checked', action='append')
    update.add_argument('--next-action', default='')
    update.add_argument('--restart', action='store_true')
    args = parser.parse_args()
    try:
        course = Course(args.root)
        if args.command == 'lesson': result = course.resolve(args.query)
        elif args.command == 'resume': result = course.resume()
        elif args.command == 'status': result = course.read()
        else:
            result = course.save_step(args.query, args.step, args.revision, status=args.status,
                                      outputs=args.output, checked=args.checked,
                                      next_action=args.next_action, restart=args.restart)
        print(json.dumps(result, ensure_ascii=False, indent=2))
    except (CourseError, OSError) as exc:
        parser.exit(2, str(exc) + '\n')


if __name__ == '__main__':
    main()
