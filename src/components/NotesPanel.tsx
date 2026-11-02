import { useState, useEffect } from 'react'
import { saveNote } from '../lib/progress'

interface Props {
  lessonId: string
  initialNote: string
}

export function NotesPanel({ lessonId, initialNote }: Props) {
  const [text, setText] = useState(initialNote)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setText(initialNote)
    setSaved(false)
  }, [lessonId, initialNote])

  function handleSave() {
    saveNote(lessonId, text)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="notes-panel">
      <div className="notes-header">
        <span className="notes-title">📝 Jouw notities</span>
        <button className={`notes-save-btn ${saved ? 'saved' : ''}`} onClick={handleSave}>
          {saved ? '✓ Opgeslagen' : 'Opslaan'}
        </button>
      </div>
      <textarea
        className="notes-textarea"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Schrijf hier je aantekeningen, vragen of inzichten uit deze les..."
        rows={6}
      />
    </div>
  )
}
