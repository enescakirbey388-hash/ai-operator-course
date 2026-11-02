import { useState, useEffect } from 'react'
import type { Question } from '../content/types'
import { grade } from '../lib/grade'

interface Props {
  questions: Question[]
  passPercent: number
  onPass: (score: number, percent: number) => void
  alreadyPassed?: boolean
  forceSubmit?: boolean
}

export function Quiz({ questions, passPercent, onPass, alreadyPassed = false, forceSubmit = false }: Props) {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(alreadyPassed)
  const [result, setResult] = useState<{ correct: number; total: number; percent: number } | null>(
    alreadyPassed ? { correct: questions.length, total: questions.length, percent: 100 } : null
  )

  useEffect(() => {
    if (forceSubmit && !submitted) {
      doSubmit()
    }
  }, [forceSubmit])

  function pick(qId: string, optId: string) {
    if (submitted) return
    setAnswers(prev => ({ ...prev, [qId]: optId }))
  }

  function doSubmit() {
    const filledAnswers = { ...answers }
    questions.forEach(q => { if (!filledAnswers[q.id]) filledAnswers[q.id] = '' })
    const r = grade(questions, filledAnswers)
    setResult(r)
    setSubmitted(true)
    if (r.percent >= passPercent) onPass(r.correct, r.percent)
  }

  function retry() {
    setAnswers({})
    setSubmitted(false)
    setResult(null)
  }

  const answeredCount = questions.filter(q => answers[q.id]).length
  const allAnswered = answeredCount === questions.length
  const passed = result && result.percent >= passPercent

  if (alreadyPassed && !result) return (
    <div className="quiz-passed-badge">✓ Al voltooid — je hebt dit gehaald</div>
  )

  return (
    <div className="quiz">
      {!submitted && (
        <div className="quiz-progress-bar-wrap">
          <div className="quiz-progress-bar">
            <div className="quiz-progress-fill" style={{ width: `${(answeredCount / questions.length) * 100}%` }} />
          </div>
          <span className="quiz-progress-label">{answeredCount}/{questions.length} beantwoord</span>
        </div>
      )}

      {questions.map((q, qi) => {
        const chosen = answers[q.id]
        return (
          <div key={q.id} className="quiz-question">
            <p className="quiz-prompt"><span className="q-num">{qi + 1}.</span> {q.prompt}</p>
            <div className="quiz-options">
              {q.options.map(opt => {
                let cls = 'quiz-option'
                if (submitted) {
                  if (opt.id === q.correct) cls += ' correct'
                  else if (opt.id === chosen) cls += ' wrong'
                } else if (chosen === opt.id) {
                  cls += ' selected'
                }
                return (
                  <button key={opt.id} className={cls} onClick={() => pick(q.id, opt.id)} disabled={submitted}>
                    <span className="opt-letter">{opt.id.toUpperCase()}</span>
                    <span>{opt.text}</span>
                  </button>
                )
              })}
            </div>
            {submitted && (
              <div className={`quiz-explanation ${chosen === q.correct ? 'ok' : 'nok'}`}>
                {chosen === q.correct ? '✓ Goed! ' : '✗ Niet goed. '}{q.explanation}
              </div>
            )}
          </div>
        )
      })}

      {!submitted && (
        <div className="quiz-submit-row">
          <button className="btn-primary" onClick={doSubmit} disabled={!allAnswered}>
            Antwoorden controleren
          </button>
          {!allAnswered && <span className="quiz-hint">{questions.length - answeredCount} vragen nog open</span>}
        </div>
      )}

      {submitted && result && (
        <div className={`quiz-result ${passed ? 'pass' : 'fail'}`}>
          <div className="quiz-result-score">
            <span className="quiz-result-pct">{result.percent}%</span>
            <span className="quiz-result-detail">{result.correct}/{result.total} goed</span>
          </div>
          <div className="quiz-result-status">
            {passed ? '✓ Geslaagd!' : `✗ Niet geslaagd — minimaal ${passPercent}% nodig`}
          </div>
          {!passed && (
            <button className="btn-secondary" onClick={retry}>Opnieuw proberen</button>
          )}
        </div>
      )}
    </div>
  )
}
