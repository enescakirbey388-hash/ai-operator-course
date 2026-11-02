import { useState, useCallback } from 'react'
import { course } from './content/course'
import { loadProgress, resetProgress, unlockModule } from './lib/progress'
import type { Progress, ExamRecord } from './lib/progress'
import { Sidebar } from './components/Sidebar'
import { LessonView } from './components/LessonView'
import { ExamView } from './components/ExamView'
import { HomeView } from './components/HomeView'
import { CertificateView } from './components/CertificateView'
import './App.css'

type View =
  | { kind: 'home' }
  | { kind: 'lesson'; moduleId: string; lessonId: string }
  | { kind: 'exam'; moduleId: string }
  | { kind: 'final' }
  | { kind: 'certificate'; score: number; date: string }

const MODULE_IDS = course.modules.map(m => m.id)

export default function App() {
  const [view, setView] = useState<View>({ kind: 'home' })
  const [progress, setProgress] = useState<Progress>(loadProgress)
  const [studentName, setStudentName] = useState(() => localStorage.getItem('ai-course-name') || '')

  const refresh = useCallback(() => setProgress(loadProgress()), [])

  function selectLesson(moduleId: string, lessonId: string) {
    setView({ kind: 'lesson', moduleId, lessonId })
  }

  function selectExam(moduleId: string) {
    setView({ kind: 'exam', moduleId })
  }

  function handleStart() {
    const firstModule = course.modules[0]
    selectLesson(firstModule.id, firstModule.lessons[0].id)
  }

  function handleReset() {
    if (confirm('Weet je zeker dat je alle voortgang wilt wissen?')) {
      resetProgress()
      refresh()
      setView({ kind: 'home' })
    }
  }

  function handleExamComplete(moduleId: string, rec: ExamRecord) {
    refresh()
    if (rec.passed) {
      const idx = MODULE_IDS.indexOf(moduleId)
      if (idx >= 0 && idx < MODULE_IDS.length - 1) {
        unlockModule(MODULE_IDS[idx + 1])
        refresh()
      }
    }
  }

  function handleFinalComplete(rec: ExamRecord) {
    refresh()
    if (rec.passed) {
      const name = prompt('Gefeliciteerd! Voer je naam in voor het certificaat:') || studentName
      if (name) {
        setStudentName(name)
        localStorage.setItem('ai-course-name', name)
      }
      setView({ kind: 'certificate', score: rec.percent, date: rec.at })
    }
  }

  const activeModuleId = view.kind === 'lesson' ? view.moduleId
    : view.kind === 'exam' ? view.moduleId
    : view.kind === 'final' || view.kind === 'certificate' ? '__final__'
    : ''

  const activeLessonId = view.kind === 'lesson' ? view.lessonId
    : view.kind === 'exam' ? '__exam__'
    : null

  return (
    <div className="app-shell">
      {view.kind !== 'certificate' && (
        <Sidebar
          modules={course.modules}
          activeModuleId={activeModuleId}
          activeLessonId={activeLessonId}
          progress={progress}
          onSelectLesson={selectLesson}
          onSelectExam={selectExam}
          onSelectFinal={() => setView({ kind: 'final' })}
          onSelectHome={() => setView({ kind: 'home' })}
        />
      )}
      <main className="content-area">
        {view.kind === 'home' && (
          <HomeView
            course={course}
            progress={progress}
            onStart={handleStart}
            onReset={handleReset}
          />
        )}
        {view.kind === 'lesson' && (() => {
          const mod = course.modules.find(m => m.id === view.moduleId)!
          const lesson = mod.lessons.find(l => l.id === view.lessonId)!
          const isDone = progress.completedLessons.includes(lesson.id)
          const savedNote = progress.notes?.[lesson.id] ?? ''
          return (
            <LessonView
              key={lesson.id}
              lesson={lesson}
              isDone={isDone}
              savedNote={savedNote}
              onDone={refresh}
              onRefresh={refresh}
            />
          )
        })()}
        {view.kind === 'exam' && (() => {
          const mod = course.modules.find(m => m.id === view.moduleId)!
          return (
            <ExamView
              key={mod.exam.id}
              exam={mod.exam}
              label={`Module ${mod.number}`}
              existing={progress.exams[mod.exam.id]}
              onComplete={(rec) => handleExamComplete(mod.id, rec)}
            />
          )
        })()}
        {view.kind === 'final' && (
          <ExamView
            key="final"
            exam={course.finalExam}
            label="Eindexamen"
            existing={progress.exams['final']}
            onComplete={handleFinalComplete}
          />
        )}
        {view.kind === 'certificate' && (
          <CertificateView
            name={studentName}
            score={view.score}
            date={view.date}
            onClose={() => setView({ kind: 'home' })}
          />
        )}
      </main>
    </div>
  )
}
