import type { Course } from '../content/types'
import type { Progress } from '../lib/progress'

interface Props {
  course: Course
  progress: Progress
  onStart: () => void
  onReset: () => void
}

export function HomeView({ course, progress, onStart, onReset }: Props) {
  const totalLessons = course.modules.reduce((s, m) => s + m.lessons.length, 0)
  const done = progress.completedLessons.length
  const pct = Math.round((done / totalLessons) * 100)
  const passedExams = Object.values(progress.exams).filter(e => e.passed).length
  const totalExams = course.modules.length + 1

  return (
    <div className="home-view">
      <div className="home-hero">
        <div className="home-badge">5 modules · examens · NL/BE</div>
        <h1 className="home-title">{course.title}</h1>
        <p className="home-subtitle">{course.subtitle}</p>
        <p className="home-intro">{course.intro}</p>
        <div className="home-actions">
          <button className="btn-primary" onClick={onStart}>
            {done === 0 ? 'Start de cursus' : 'Verdergaan'}
          </button>
          {done > 0 && (
            <button className="btn-ghost" onClick={onReset}>
              Reset voortgang
            </button>
          )}
        </div>
      </div>

      <div className="home-stats">
        <div className="stat">
          <span className="stat-value">{pct}%</span>
          <span className="stat-label">Lessen voltooid</span>
        </div>
        <div className="stat">
          <span className="stat-value">{done}/{totalLessons}</span>
          <span className="stat-label">Lessen gedaan</span>
        </div>
        <div className="stat">
          <span className="stat-value">{passedExams}/{totalExams}</span>
          <span className="stat-label">Toetsen geslaagd</span>
        </div>
      </div>

      <div className="module-cards">
        {course.modules.map(mod => {
          const lessonsDone = mod.lessons.filter(l => progress.completedLessons.includes(l.id)).length
          const examPassed = progress.exams[mod.exam.id]?.passed
          return (
            <div key={mod.id} className="module-card">
              <div className="module-card-number">{mod.number}</div>
              <div className="module-card-body">
                <h3>{mod.title}</h3>
                <p>{mod.tagline}</p>
                <div className="module-card-meta">
                  {lessonsDone}/{mod.lessons.length} lessen
                  {examPassed && <span className="passed-badge">Toets ✓</span>}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
