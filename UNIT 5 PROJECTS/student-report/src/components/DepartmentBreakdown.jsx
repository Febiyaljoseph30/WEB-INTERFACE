import './DepartmentBreakdown.css'
import { attendanceThreshold } from '../data/students.js'

function DepartmentBreakdown({ rows }) {
  if (!rows.length) {
    return <p className="dept-empty">No department matches the current filter.</p>
  }

  return (
    <table className="dept-table">
      <thead>
        <tr>
          <th>Department</th>
          <th>Students</th>
          <th>Avg CGPA</th>
          <th>Avg Attendance</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => {
          const low = row.avgAttendance < attendanceThreshold
          return (
            <tr key={row.code}>
              <td>
                <span className="dept-code">{row.code}</span>
                <span className="dept-name">{row.name}</span>
              </td>
              <td>{row.count}</td>
              <td>
                <span className="dept-meter">
                  <span className="dept-meter__fill" style={{ width: `${row.avgCgpa * 10}%` }} />
                </span>
                {row.avgCgpa}
              </td>
              <td className={low ? 'dept-low' : undefined}>
                {row.avgAttendance}%{low ? ' (low)' : ''}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default DepartmentBreakdown
