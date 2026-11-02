export type CalloutKind = 'info' | 'warn' | 'nlbe' | 'practice'

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'callout'; kind: CalloutKind; title: string; text: string }
  | { type: 'code'; lang: string; code: string }
  | { type: 'task'; title: string; text: string }

export type Video = {
  title: string
  youtubeId: string
  minutes: number
  why: string
}

export type Question = {
  id: string
  prompt: string
  options: { id: string; text: string }[]
  correct: string
  explanation: string
}

export type Lesson = {
  id: string
  title: string
  minutes: number
  summary: string
  video: Video
  body: Block[]
  checkpoint: Question[]
}

export type ModuleExam = {
  id: string
  title: string
  minutes: number
  passPercent: number
  questions: Question[]
}

export type CourseModule = {
  id: string
  number: string
  title: string
  tagline: string
  why: string
  lessons: Lesson[]
  exam: ModuleExam
}

export type Course = {
  title: string
  subtitle: string
  intro: string
  modules: CourseModule[]
  finalExam: ModuleExam
}
