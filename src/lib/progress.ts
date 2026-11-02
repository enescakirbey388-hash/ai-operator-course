const KEY = 'ai-operator-course-progress-v1'

export type ExamRecord = {
  score: number
  percent: number
  passed: boolean
  at: string
}

export type Progress = {
  completedLessons: string[]
  exams: Record<string, ExamRecord>
  notes: Record<string, string>
  unlockedModules: string[]
}

const empty = (): Progress => ({ completedLessons: [], exams: {}, notes: {}, unlockedModules: ['research'] })

export function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return empty()
    const parsed = JSON.parse(raw) as Progress
    return {
      completedLessons: parsed.completedLessons ?? [],
      exams: parsed.exams ?? {},
      notes: parsed.notes ?? {},
      unlockedModules: parsed.unlockedModules ?? ['research'],
    }
  } catch {
    return empty()
  }
}

export function saveProgress(next: Progress) {
  localStorage.setItem(KEY, JSON.stringify(next))
}

export function markLessonDone(lessonId: string) {
  const p = loadProgress()
  if (!p.completedLessons.includes(lessonId)) {
    p.completedLessons.push(lessonId)
    saveProgress(p)
  }
  return p
}

export function recordExam(examId: string, record: ExamRecord) {
  const p = loadProgress()
  const prev = p.exams[examId]
  if (!prev || record.percent >= prev.percent) {
    p.exams[examId] = record
    saveProgress(p)
  }
  return loadProgress()
}

export function resetProgress() {
  saveProgress(empty())
}

export function saveNote(lessonId: string, note: string) {
  const p = loadProgress()
  p.notes[lessonId] = note
  saveProgress(p)
  return p
}

export function unlockModule(moduleId: string) {
  const p = loadProgress()
  if (!p.unlockedModules.includes(moduleId)) {
    p.unlockedModules.push(moduleId)
    saveProgress(p)
  }
  return loadProgress()
}

export function isModuleUnlocked(moduleId: string, progress: Progress): boolean {
  return progress.unlockedModules.includes(moduleId)
}

export function getModuleUnlockPercent(moduleId: string, allModuleIds: string[]): number {
  const idx = allModuleIds.indexOf(moduleId)
  return idx === 0 ? 100 : idx * 20
}
