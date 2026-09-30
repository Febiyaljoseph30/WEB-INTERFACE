import './SummaryCards.css'

function Card({ label, value, hint, tone }) {
  return (
    <div className={`stat-card${tone ? ` stat-card--${tone}` : ''}`}>
      <span className="stat-card__label">{label}</span>
      <strong className="stat-card__value">{value}</strong>
      {hint ? <span className="stat-card__hint">{hint}</span> : null}
    </div>
  )
}

function SummaryCards({ summary }) {
  return (
    <section className="stat-grid" aria-label="Class summary">
      <Card label="Students" value={summary.total} hint="in this batch" />
      <Card label="Average CGPA" value={summary.avgCgpa} hint="out of 10" />
      <Card
        label="Average Attendance"
        value={`${summary.avgAttendance}%`}
        hint="across all subjects"
      />
      <Card label="Pass Rate" value={`${summary.passRate}%`} tone="good" hint="cleared every subject" />
      <Card
        label="Attendance Risk"
        value={summary.atRisk}
        tone={summary.atRisk > 0 ? 'warn' : undefined}
        hint="below 75%"
      />
      <Card label="Highest CGPA" value={summary.bestCgpa} tone="best" hint="topper" />
    </section>
  )
}

export default SummaryCards
