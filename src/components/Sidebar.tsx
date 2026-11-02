import type { CourseModule } from '../content/types'
import type { Progress } from '../lib/progress'

interface Props {
  modules: CourseModule[]
  activeModuleId: string
  activeLessonId: string | null
  progress: Progress
  onSelectLesson: (moduleId: string, lessonId: string) => void
  onSelectExam: (moduleId: string) => void
  onSelectFinal: () => void
  onSelectHome: () => void
}

export function Sidebar({ modules, activeModuleId, activeLessonId, progress, onSelectLesson, onSelectExam, onSelectFinal, onSelectHome }: Props) {
  const totalLessons = modules.reduce((s, m) => s + m.lessons.length, 0)
  const done = progress.completedLessons.length
  const pct = Math.round((done / totalLessons) * 100)

  function isUnlocked(mod: CourseModule, idx: number): boolean {
    if (idx === 0) return true
    return progress.unlockedModules?.includes(mod.id) ?? false
  }

  function handleModuleClick(mod: CourseModule, idx: number) {
    if (!isUnlocked(mod, idx)) return
    onSelectLesson(mod.id, mod.lessons[0].id)
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-header" onClick={onSelectHome} role="button" style={{ cursor: 'pointer' }}>
        <div className="sidebar-logo">AI<span>Operator</span></div>
        <div className="sidebar-progress-wrap">
          <div className="sidebar-progress-bar">
            <div className="sidebar-progress-fill" style={{ width: `${pct}%` }} />
          </div>
          <span className="sidebar-progress-label">{done}/{totalLessons} lessen · {pct}%</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {modules.map((mod, idx) => {
          const isOpen = mod.id === activeModuleId
          const unlocked = isUnlocked(mod, idx)
          const lessonsDone = mod.lessons.filter(l => progress.completedLessons.includes(l.id)).length
          const modDone = lessonsDone === mod.lessons.length
          const examRecord = progress.exams[mod.exam.id]

          return (
            <div key={mod.id} className={`sidebar-module ${!unlocked ? 'locked' : ''}`}>
              <button
                className={`sidebar-module-btn ${isOpen ? 'active' : ''} ${modDone ? 'done' : ''}`}
                onClick={() => handleModuleClick(mod, idx)}
                disabled={!unlocked}
                title={!unlocked ? 'Voltooi de vorige module om dit te ontgrendelen' : ''}
              >
                <span className="mod-number">{mod.number}</span>
                <span className="mod-title">{mod.title}</span>
                {!unlocked && <span className="mod-lock">🔒</span>}
                {modDone && unlocked && <span className="check">✓</span>}
                {unlocked && !modDone && (
                  <span className="mod-mini-pct">{lessonsDone}/{mod.lessons.length}</span>
                )}
              </button>
              {isOpen && unlocked && (
                <div className="sidebar-lessons">
                  {mod.lessons.map(lesson => {
                    const isDone = progress.completedLessons.includes(lesson.id)
                    const isActive = lesson.id === activeLessonId
                    return (
                      <button
                        key={lesson.id}
                        className={`sidebar-lesson-btn ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`}
                        onClick={() => onSelectLesson(mod.id, lesson.id)}
                      >
                        <span className="lesson-dot">{isDone ? '✓' : '○'}</span>
                        <span>{lesson.title}</span>
                        <span className="lesson-min">{lesson.minutes}m</span>
                      </button>
                    )
                  })}
                  <button
                    className={`sidebar-exam-btn ${activeLessonId === '__exam__' && isOpen ? 'active' : ''} ${examRecord?.passed ? 'done' : ''}`}
                    onClick={() => onSelectExam(mod.id)}
                  >
                    <span className="lesson-dot">{examRecord?.passed ? '✓' : '📝'}</span>
                    <span>Moduletoets {examRecord ? `(${examRecord.percent}%)` : ''}</span>
                  </button>
                </div>
              )}
            </div>
          )
        })}

        <button
          className={`sidebar-final-btn ${activeModuleId === '__final__' ? 'active' : ''} ${progress.exams['final']?.passed ? 'done' : ''}`}
          onClick={onSelectFinal}
        >
          <span>🎓 Eindexamen</span>
          {progress.exams['final'] && <span className="final-score">{progress.exams['final'].percent}%</span>}
        </button>
      </nav>
    </aside>
  )
}
