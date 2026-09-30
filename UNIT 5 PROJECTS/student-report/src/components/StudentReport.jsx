import './StudentReport.css'
import { departments, attendanceThreshold } from '../data/students.js'
import { subjectRows, remarkFor } from '../utils/report.js'

function StudentReport({ student, onClose, onPrint, onRemove }) {
  if (!student) {
    return (
      <section className="report report--empty">
        <h2>Student Report</h2>
        <p>Select a row from the table to open the full report card.</p>
      </section>
    )
  }

  const dept = departments[student.department]
  const rows = subjectRows(student)
  const totalCredits = rows.reduce((sum, r) => sum + r.credits, 0)
  const totalMarks = rows.reduce((sum, r) => sum + r.marks, 0)
  const outOf = rows.length * 100
  const low = student.attendancePercent < attendanceThreshold

  return (
    <section className="report" id="report-card">
      <div className="report__toolbar no-print">
        <h2>Report Card</h2>
        <div className="report__actions">
          <button type="button" className="btn btn--primary" onClick={onPrint}>
            Print / Save PDF
          </button>
          <button type="button" className="btn btn--danger" onClick={() => onRemove(student.id)}>
            Delete
          </button>
          <button type="button" className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>

      <header className="report__head">
        <div>
          <h1>{student.name}</h1>
          <p className="report__meta">
            {student.rollNo} &middot; {dept.name} &middot; Year {student.year}, Semester{' '}
            {student.semester} &middot; Section {student.section}
          </p>
        </div>
        <span className={`pill pill--${student.status.tone}`}>{student.status.label}</span>
      </header>

      <div className="report__tiles">
        <div className="tile">
          <span>CGPA</span>
          <strong>{student.cgpa}</strong>
        </div>
        <div className="tile">
          <span>Total Marks</span>
          <strong>
            {totalMarks}
            <em>/{outOf}</em>
          </strong>
        </div>
        <div className="tile">
          <span>Credits</span>
          <strong>{totalCredits}</strong>
        </div>
        <div className={low ? 'tile tile--warn' : 'tile'}>
          <span>Attendance</span>
          <strong>
            {student.attendancePercent}
            <em>%</em>
          </strong>
          <small>
            {student.attendance.attended} of {student.attendance.held} classes
          </small>
        </div>
      </div>

      <h3 className="report__section-title">Subject wise result</h3>
      <table className="report__table">
        <thead>
          <tr>
            <th>Code</th>
            <th>Subject</th>
            <th>Credits</th>
            <th>Marks</th>
            <th>Grade</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.code}>
              <td className="mono">{r.code}</td>
              <td>{r.name}</td>
              <td>{r.credits}</td>
              <td className="mono">{r.marks}</td>
              <td className="mono">
                {r.grade.letter} ({r.grade.point})
              </td>
              <td className={r.passed ? 'pass' : 'fail-mark'}>{r.passed ? 'Pass' : 'Fail'}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="2">Total</td>
            <td>{totalCredits}</td>
            <td className="mono">{totalMarks}</td>
            <td colSpan="2" className="mono">
              CGPA {student.cgpa}
            </td>
          </tr>
        </tfoot>
      </table>

      <p className="report__remark">
        <strong>Remark:</strong> {remarkFor(student)}
      </p>

      <footer className="report__sign">
        <span>Class Teacher</span>
        <span>Head of Department</span>
        <span>Principal</span>
      </footer>
    </section>
  )
}

export default StudentReport
