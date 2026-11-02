import type { Question } from '../content/types'

export function grade(questions: Question[], answers: Record<string, string>) {
  let correct = 0
  for (const q of questions) {
    if (answers[q.id] === q.correct) correct += 1
  }
  const percent = Math.round((correct / questions.length) * 100)
  return { correct, total: questions.length, percent }
}
