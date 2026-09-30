import './Filters.css'
import { departmentList } from '../data/students.js'

const statusOptions = [
  { value: 'all', label: 'All statuses' },
  { value: 'distinction', label: 'Distinction' },
  { value: 'first', label: 'First Class' },
  { value: 'second', label: 'Second Class' },
  { value: 'pass', label: 'Pass' },
  { value: 'at-risk', label: 'At Risk' },
  { value: 'fail', label: 'Fail' },
]

function Filters({ search, department, status, onSearch, onDepartment, onStatus, onReset }) {
  return (
    <div className="filters">
      <label className="filters__field filters__field--grow">
        <span>Search</span>
        <input
          type="search"
          value={search}
          placeholder="Name or roll number"
          onChange={(e) => onSearch(e.target.value)}
        />
      </label>

      <label className="filters__field">
        <span>Department</span>
        <select value={department} onChange={(e) => onDepartment(e.target.value)}>
          <option value="all">All departments</option>
          {departmentList.map((d) => (
            <option key={d.code} value={d.code}>
              {d.code} &ndash; {d.name}
            </option>
          ))}
        </select>
      </label>

      <label className="filters__field">
        <span>Status</span>
        <select value={status} onChange={(e) => onStatus(e.target.value)}>
          {statusOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </label>

      <button type="button" className="filters__reset" onClick={onReset}>
        Reset
      </button>
    </div>
  )
}

export default Filters
