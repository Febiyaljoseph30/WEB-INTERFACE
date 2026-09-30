import './StudentTable.css'
import { attendanceThreshold } from '../data/students.js'

const columns = [
  { key: 'rollNo', label: 'Roll No' },
  { key: 'name', label: 'Name' },
  { key: 'department', label: 'Department' },
  { key: 'year', label: 'Year' },
  { key: 'cgpa', label: 'CGPA' },
  { key: 'attendancePercent', label: 'Attendance' },
  { key: 'status', label: 'Status' },
]

function StudentTable({ students, sort, onSort, selectedId, onSelect }) {
  if (!students.length) {
    return <p className="table-empty">No student matches the current filter.</p>
  }

  return (
    <div className="table-scroll">
      <table className="student-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>
                <button type="button" onClick={() => onSort(col.key)}>
                  {col.label}
                  {sort.key === col.key ? <span className="sort-arrow">{sort.dir === 'asc' ? '▲' : '▼'}</span> : null}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {students.map((s) => {
            const low = s.attendancePercent < attendanceThreshold
            return (
              <tr
                key={s.id}
                onClick={() => onSelect(s.id)}
                className={s.id === selectedId ? 'is-selected' : undefined}
              >
                <td className="mono">{s.rollNo}</td>
                <td className="strong">{s.name}</td>
                <td>
                  <span className="pill pill--dept">{s.department}</span>
                </td>
                <td>
                  {s.year} / {s.semester}
                </td>
                <td className="mono">{s.cgpa}</td>
                <td className={low ? 'att-low' : 'att-ok'}>
                  {s.attendancePercent}%
                  <span className="att-sub">
                    {s.attendance.attended}/{s.attendance.held}
                  </span>
                </td>
                <td>
                  <span className={`pill pill--${s.status.tone}`}>{s.status.label}</span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default StudentTable
