"""Portable acceptance checks; no network, accounts or third-party dependencies."""
import importlib.util
import json
import hashlib
from pathlib import Path
import re
import shutil
import tempfile
import unittest

REPO = Path(__file__).resolve().parents[1]
PACK = REPO / 'studentenpakket-v16'
spec = importlib.util.spec_from_file_location('course', PACK / 'interactief/tools/course.py')
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


class ContentTests(unittest.TestCase):
    def setUp(self):
        self.course = module.Course(REPO)

    def test_release_hashes_match_on_this_platform(self):
        for line in (REPO / 'MANIFEST.sha256').read_text(encoding='utf-8').splitlines():
            expected, name = line.split('  ', 1)
            self.assertEqual(hashlib.sha256((REPO / name).read_bytes()).hexdigest(), expected, name)

    def test_exactly_113_lessons_and_codes(self):
        lessons = self.course.lessons
        self.assertEqual([l['number'] for l in lessons], list(range(1, 114)))
        self.assertEqual(len({l['code'] for l in lessons}), 113)
        cards = re.findall(r'\]\(werkkaarten/([^/)]+)\.md\)', (PACK / 'WERKKAARTEN.md').read_text(encoding='utf-8'))
        self.assertEqual([l['code'] for l in lessons], cards)

    def test_every_lesson_has_materials_steps_and_banner(self):
        for lesson in self.course.lessons:
            with self.subTest(code=lesson['code']):
                body = (PACK / lesson['file']).read_text(encoding='utf-8')
                self.assertIn('T H E   A I   O P E R A T O R', body)
                self.assertIn(f"LES {lesson['number']:03d} / 113", body)
                steps = re.findall(r'^## Stap (\d+) ·', body, re.M)
                self.assertEqual([int(x) for x in steps], list(range(1, lesson['steps'] + 1)))
                self.assertIn('?', body.split('## Stap 1 ·')[1].split('## Stap 2 ·')[0])
                for path in lesson['inputs'] + [s['path'] for s in lesson['skills']]:
                    self.assertTrue((PACK / path).is_file(), path)
                    self.assertNotIn('source-only/', path)
                for dependency in lesson['dependencies']:
                    self.assertLess(self.course.by_code[dependency]['number'], lesson['number'])
                self.assertNotIn('Vertel hardop welke keuze jij maakt', body)
                self.assertNotIn('START-V15', body)

    def test_all_new_markdown_links_resolve(self):
        files = list((PACK / 'lessen').glob('*.md')) + list((PACK / 'interactief').glob('*.md'))
        files += [REPO / 'README.md', PACK / 'START-HIER.md', PACK / 'START-V16.md']
        for file in files:
            for target in re.findall(r'\]\(([^)]+)\)', file.read_text(encoding='utf-8')):
                if target.startswith(('https://', 'http://', '#')): continue
                self.assertTrue((file.parent / target.split('#')[0]).exists(), (file, target))

    def test_root_and_subfolder_have_coach_entry(self):
        self.assertEqual(module.package_root(REPO), module.package_root(PACK))
        for path in [REPO / 'AGENTS.md', PACK / 'AGENTS.md']:
            self.assertIn('interactief/COACH.md', path.read_text(encoding='utf-8'))
        skills = list(REPO.glob('**/.agents/skills/lio-masterclass/SKILL.md'))
        self.assertEqual(len(skills), 1)

    def test_exact_resolution_and_bounds(self):
        for query in ['54', '054', 'N28', 'n28', 'Start les 54', 'Start les n28']:
            self.assertEqual(self.course.resolve(query)['code'], 'N28')
        for query in ['0', '114', '-1', '../N28', 'N280', '', '54abc']:
            with self.assertRaises(module.CourseError): self.course.resolve(query)
        self.assertEqual(self.course.resolve('3.2a')['number'], 32)

    def test_titles_match_existing_workcards(self):
        for lesson in self.course.lessons:
            first = (PACK / 'werkkaarten' / (lesson['code'] + '.md')).read_text(encoding='utf-8').splitlines()[0]
            self.assertIn(lesson['title'], first)


class ProgressTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory(prefix='lio-course-')
        self.root = Path(self.tmp.name) / 'cursus met spaties é'
        (self.root / 'interactief').mkdir(parents=True)
        shutil.copyfile(PACK / 'interactief/lessen.json', self.root / 'interactief/lessen.json')
        self.course = module.Course(self.root)

    def tearDown(self): self.tmp.cleanup()

    def test_fresh_resume_does_not_write(self):
        self.assertEqual(self.course.resume()['lesson']['code'], '0.1')
        self.assertFalse((self.root / '.lio').exists())

    def test_resume_new_instance_and_preserve_other_lessons(self):
        first = self.course.save_step('54', 2, 0, next_action='Kies creatives')
        self.course.save_step('55', 1, 1)
        new = module.Course(self.root)
        self.assertEqual(new.resume()['lesson']['code'], 'N29')
        self.assertEqual(new.read()['lessons']['N28']['run_id'], first['lessons']['N28']['run_id'])
        self.assertEqual(new.read()['lessons']['N28']['step'], 2)
        self.assertEqual(json.loads((self.root / '.lio/progress.previous.json').read_text())['revision'], 1)

    def test_revision_conflict_does_not_lose_work(self):
        self.course.save_step('54', 1, 0)
        with self.assertRaises(module.CourseError): self.course.save_step('55', 1, 0)
        self.assertEqual(self.course.read()['active_lesson'], 'N28')
        self.assertEqual(self.course.read()['revision'], 1)

    def test_lock_prevents_parallel_writes(self):
        self.course.state_dir.mkdir()
        (self.course.state_dir / 'progress.lock').write_text('another session')
        with self.assertRaises(module.CourseError): self.course.save_step('54', 1, 0)
        self.assertFalse(self.course.state_file.exists())

    def test_corrupt_state_never_overwritten(self):
        self.course.state_dir.mkdir()
        self.course.state_file.write_text('{bad json')
        with self.assertRaises(module.CourseError): self.course.save_step('54', 1, 0)
        self.assertEqual(self.course.state_file.read_text(), '{bad json')

    def test_completion_needs_real_output_and_check(self):
        final = self.course.resolve('54')['steps']
        with self.assertRaises(module.CourseError): self.course.save_step('54', final, 0, status='completed')
        with self.assertRaises(module.CourseError):
            self.course.save_step('54', final, 0, status='completed', outputs=['missing.md'], checked=['not evidence'])
        (self.root / 'resultaat.md').write_text('campagneconcept')
        state = self.course.save_step('54', final, 0, status='completed', outputs=['resultaat.md'], checked=['Bestand gelezen; inhoud door coach gecontroleerd'])
        self.assertEqual(state['lessons']['N28']['status'], 'completed')

    def test_restart_preserves_previous_run_and_outputs(self):
        (self.root / 'resultaat.md').write_text('oud resultaat')
        final = self.course.resolve('54')['steps']
        before = self.course.save_step('54', final, 0, status='completed', outputs=['resultaat.md'], checked=['gecontroleerd'])
        with self.assertRaises(module.CourseError): self.course.save_step('54', 1, 1)
        after = self.course.save_step('54', 1, 1, restart=True)
        item = after['lessons']['N28']
        self.assertNotEqual(item['run_id'], before['lessons']['N28']['run_id'])
        self.assertEqual(item['previous_runs'][0]['outputs'], ['resultaat.md'])
        self.assertTrue((self.root / 'resultaat.md').exists())

    def test_path_escape_rejected(self):
        for path in ['../outside.md', '/tmp/outside.md', 'C:\\outside.md']:
            with self.assertRaises(module.CourseError): self.course.save_step('54', 1, 0, outputs=[path])

    def test_symlink_escape_rejected(self):
        outside = Path(self.tmp.name) / 'outside'; outside.mkdir()
        try: (self.root / '.lio').symlink_to(outside, target_is_directory=True)
        except OSError: self.skipTest('Symlink permission unavailable on this runner')
        with self.assertRaises(module.CourseError): self.course.save_step('54', 1, 0)
        self.assertEqual(list(outside.iterdir()), [])

    def test_unknown_fields_and_blocked_state_preserved(self):
        state = self.course.save_step('54', 2, 0, status='blocked', next_action='Account ontbreekt')
        state['notes'] = {'keep': True}
        self.course.state_file.write_text(json.dumps(state))
        self.course.save_step('55', 1, 1)
        self.assertEqual(self.course.read()['notes'], {'keep': True})
        self.assertEqual(self.course.read()['lessons']['N28']['status'], 'blocked')

    def test_update_copy_retains_state_and_outputs(self):
        (self.root / 'resultaat.md').write_text('eigen werk')
        self.course.save_step('54', 2, 0, outputs=['resultaat.md'])
        new = Path(self.tmp.name) / 'nieuwe release'
        (new / 'interactief').mkdir(parents=True)
        shutil.copyfile(PACK / 'interactief/lessen.json', new / 'interactief/lessen.json')
        shutil.copytree(self.root / '.lio', new / '.lio')
        shutil.copyfile(self.root / 'resultaat.md', new / 'resultaat.md')
        self.assertEqual(module.Course(new).resume()['step'], 2)
        self.assertTrue((self.root / 'resultaat.md').exists())
        self.assertEqual((new / 'resultaat.md').read_text(), 'eigen werk')


if __name__ == '__main__': unittest.main()
