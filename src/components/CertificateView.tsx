interface Props {
  name: string
  score: number
  date: string
  onClose: () => void
}

export function CertificateView({ name, score, date, onClose }: Props) {
  function handlePrint() {
    window.print()
  }

  return (
    <div className="cert-overlay">
      <div className="cert-card" id="certificate">
        <div className="cert-border">
          <div className="cert-logo">AI<span>Operator</span></div>
          <div className="cert-ornament">◆ ◆ ◆</div>
          <h1 className="cert-title">Certificaat van Voltooiing</h1>
          <p className="cert-sub">Dit certificaat bevestigt dat</p>
          <div className="cert-name">{name || 'AI Operator Student'}</div>
          <p className="cert-body">de cursus <strong>AI Operator — Van nul naar betaalde klant</strong> succesvol heeft voltooid met een eindexamenscore van</p>
          <div className="cert-score">{score}%</div>
          <p className="cert-date">Behaald op {new Date(date).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          <div className="cert-ornament">◆ ◆ ◆</div>
        </div>
      </div>
      <div className="cert-actions">
        <button className="btn-primary" onClick={handlePrint}>🖨️ Afdrukken / PDF opslaan</button>
        <button className="btn-ghost" onClick={onClose}>Sluiten</button>
      </div>
    </div>
  )
}
