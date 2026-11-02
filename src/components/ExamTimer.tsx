import { useState, useEffect, useRef } from 'react'

interface Props {
  minutes: number
  onTimeUp: () => void
  running: boolean
}

export function ExamTimer({ minutes, onTimeUp, running }: Props) {
  const totalSeconds = minutes * 60
  const [seconds, setSeconds] = useState(totalSeconds)
  const called = useRef(false)

  useEffect(() => {
    if (!running) return
    if (seconds <= 0) {
      if (!called.current) { called.current = true; onTimeUp() }
      return
    }
    const id = setTimeout(() => setSeconds(s => s - 1), 1000)
    return () => clearTimeout(id)
  }, [seconds, running, onTimeUp])

  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  const pct = (seconds / totalSeconds) * 100
  const urgent = seconds < 120

  return (
    <div className={`exam-timer ${urgent ? 'urgent' : ''}`}>
      <div className="timer-ring">
        <svg viewBox="0 0 36 36" className="timer-svg">
          <path className="timer-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
          <path className="timer-fill" strokeDasharray={`${pct}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
        </svg>
        <span className="timer-text">{mins}:{secs.toString().padStart(2, '0')}</span>
      </div>
      <span className="timer-label">resterende tijd</span>
    </div>
  )
}
