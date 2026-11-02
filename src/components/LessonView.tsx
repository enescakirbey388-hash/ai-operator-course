import { useState } from 'react'
import type { Lesson } from '../content/types'
import { Quiz } from './Quiz'
import { NotesPanel } from './NotesPanel'
import { markLessonDone } from '../lib/progress'

interface Props {
  lesson: Lesson
  isDone: boolean
  savedNote: string
  onDone: () => void
  onRefresh: () => void
}

export function LessonView({ lesson, isDone, savedNote, onDone, onRefresh }: Props) {
  const [checkpointDone, setCheckpointDone] = useState(isDone)

  function handleMarkDone() {
    markLessonDone(lesson.id)
    setCheckpointDone(true)
    onDone()
    onRefresh()
  }

  return (
    <article className="lesson-view">
      <header className="lesson-header">
        <div className="lesson-meta">
          <span className="lesson-time">⏱ {lesson.minutes} min</span>
          <span className="lesson-type">les</span>
          {(isDone || checkpointDone) && <span className="lesson-done-badge">✓ Voltooid</span>}
        </div>
        <h1 className="lesson-title">{lesson.title}</h1>
        <p className="lesson-summary">{lesson.summary}</p>
      </header>

      <div className="video-wrap">
        <iframe
          src={`https://www.youtube.com/embed/${lesson.video.youtubeId}`}
          title={lesson.video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <p className="video-why"><strong>Waarom dit?</strong> {lesson.video.why}</p>
      </div>

      <div className="lesson-body">
        {lesson.body.map((block, i) => {
          if (block.type === 'p') return <p key={i}>{block.text}</p>
          if (block.type === 'h') return <h2 key={i}>{block.text}</h2>
          if (block.type === 'ul') return <ul key={i}>{block.items.map((t, j) => <li key={j}>{t}</li>)}</ul>
          if (block.type === 'ol') return <ol key={i}>{block.items.map((t, j) => <li key={j}>{t}</li>)}</ol>
          if (block.type === 'code') return (
            <div key={i} className="code-wrap">
              <div className="code-lang">{block.lang}</div>
              <pre className="code-block"><code>{block.code}</code></pre>
            </div>
          )
          if (block.type === 'callout') return (
            <div key={i} className={`callout callout-${block.kind}`}>
              <strong>{block.title}</strong>
              <p>{block.text}</p>
            </div>
          )
          if (block.type === 'task') return (
            <div key={i} className="task-block">
              <strong>✏️ {block.title}</strong>
              <p>{block.text}</p>
            </div>
          )
          return null
        })}
      </div>

      <NotesPanel lessonId={lesson.id} initialNote={savedNote} />

      <section className="checkpoint-section">
        <h2>Checkpoint</h2>
        <p className="checkpoint-sub">Beantwoord alle vragen correct om de les af te ronden.</p>
        <Quiz
          questions={lesson.checkpoint}
          passPercent={100}
          onPass={handleMarkDone}
          alreadyPassed={isDone || checkpointDone}
        />
      </section>
    </article>
  )
}
