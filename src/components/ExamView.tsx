import { useState } from 'react'
import type { ModuleExam } from '../content/types'
import type { ExamRecord } from '../lib/progress'
import { Quiz } from './Quiz'
import { ExamTimer } from './ExamTimer'
import { recordExam } from '../lib/progress'

interface Props {
  exam: ModuleExam
  label: string
  existing?: ExamRecord
  onComplete: (record: ExamRecord) => void
}

export function ExamView({ exam, label, existing, onComplete }: Props) {
  const [started, setStarted] = useState(false)
  const [timeUp, setTimeUp] = useState(false)
  const [forceSubmit, setForceSubmit] = useState(false)

  function handlePass(score: number, percent: number) {
    const rec: ExamRecord = {
      score,
      percent,
      passed: percent >= exam.passPercent,
      at: new Date().toISOString(),
    }
    recordExam(exam.id, rec)
    onComplete(rec)
  }

  function handleTimeUp() {
    setTimeUp(true)
    setForceSubmit(true)
  }

  return (
    <article className="exam-view">
      <header className="lesson-header">
        <div className="lesson-meta">
          <span className="lesson-time">⏱ {exam.minutes} min</span>
          <span className="lesson-type">toets</span>
          {existing?.passed && <span className="lesson-done-badge">✓ Geslaagd</span>}
        </div>
        <h1 className="lesson-title">{label}: {exam.title}</h1>
        <p className="lesson-summary">
          Minimaal {exam.passPercent}% nodig om te slagen.
          {existing && <span className="exam-best"> Beste poging: {existing.percent}% {existing.passed ? '✓' : '✗'}</span>}
        </p>
      </header>

      {!started && !existing?.passed && (
        <div className="exam-start-card">
          <div className="exam-start-icon">📝</div>
          <h2>Klaar om te beginnen?</h2>
          <ul className="exam-rules">
            <li>Je hebt <strong>{exam.minutes} minuten</strong> de tijd</li>
            <li>Minimaal <strong>{exam.passPercent}%</strong> nodig om te slagen</li>
            <li>Je beste score wordt bewaard — meerdere pogingen zijn toegestaan</li>
            <li>Lees elke vraag goed voor je antwoordt</li>
          </ul>
          <button className="btn-primary btn-large" onClick={() => setStarted(true)}>
            Start de toets
          </button>
        </div>
      )}

      {(started || existing?.passed) && (
        <>
          {started && !existing?.passed && (
            <div className="exam-header-bar">
              <ExamTimer minutes={exam.minutes} onTimeUp={handleTimeUp} running={started && !timeUp} />
              {timeUp && <div className="time-up-banner">⏰ Tijd is om — antwoorden worden ingediend.</div>}
            </div>
          )}
          <Quiz
            questions={exam.questions}
            passPercent={exam.passPercent}
            onPass={(score, percent) => handlePass(score, percent)}
            alreadyPassed={existing?.passed}
            forceSubmit={forceSubmit}
          />
        </>
      )}
    </article>
  )
}
