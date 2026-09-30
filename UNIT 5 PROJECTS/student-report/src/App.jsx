import { useMemo, useState } from 'react'
import './App.css'
import { initialStudents, departmentList } from './data/students.js'
import { enrich, summarize, departmentSummary } from './utils/report.js'
import SummaryCards from './components/SummaryCards.jsx'
import DepartmentBreakdown from './components/DepartmentBreakdown.jsx'
import Filters from './components/Filters.jsx'
import StudentTable from './components/StudentTable.jsx'
import StudentReport from './components/StudentReport.jsx'
import AddStudentForm from './components/AddStudentForm.jsx'

const defaults = { search: '', department: 'all', status: 'all' }

function compare(a, b, key, dir) {
  const factor = dir === 'asc' ? 1 : -1
  const left = a[key]
  const right = b[key]
  if (typeof left === 'string') return left.localeCompare(right) * factor
  return (left - right) * factor
}

function App() {
  const [students, setStudents] = useState(() => initialStudents.map(enrich))
  const [search, setSearch] = useState(defaults.search)
  const [department, setDepartment] = useState(defaults.department)
  const [status, setStatus] = useState(defaults.status)
  const [sort, setSort] = useState({ key: 'rollNo', dir: 'asc' })
  const [selectedId, setSelectedId] = useState(initialStudents[0].id)

  const enriched = useMemo(() => students.map(enrich), [students])

  const visible = useMemo(() => {
    const term = search.trim().toLowerCase()
    return enriched
      .filter((s) => (department === 'all' ? true : s.department === department))
      .filter((s) => (status === 'all' ? true : s.status.key === status))
      .filter((s) =>
        term ? s.name.toLowerCase().includes(term) || s.rollNo.toLowerCase().includes(term) : true,
      )
      .sort((a, b) => compare(a, b, sort.key, sort.dir))
  }, [enriched, search, department, status, sort])

  const summary = useMemo(() => summarize(enriched), [enriched])
  const byDepartment = useMemo(() => departmentSummary(enriched), [enriched])
  const selected = useMemo(
    () => enriched.find((s) => s.id === selectedId) ?? null,
    [enriched, selectedId],
  )

  function handleSort(key) {
    setSort((prev) => (prev.key === key ? { key, dir: prev.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' }))
  }

  function handleAdd(record) {
    const id = Math.max(0, ...students.map((s) => s.id)) + 1
    setStudents((prev) => [...prev, { ...record, id }])
    setSelectedId(id)
  }

  function handleRemove(id) {
    setStudents((prev) => prev.filter((s) => s.id !== id))
    setSelectedId((prev) => (prev === id ? null : prev))
  }

  function resetFilters() {
    setSearch(defaults.search)
    setDepartment(defaults.department)
    setStatus(defaults.status)
  }

  return (
    <div className="app">
      <header className="app__header">
        <div>
          <h1>Student Performance Report</h1>
          <p>
            Unit 5 &middot; Semester {selected ? selected.semester : 4} result analysis for{' '}
            {departmentList.length} departments
          </p>
        </div>
        <AddStudentForm onAdd={handleAdd} />
      </header>

      <SummaryCards summary={summary} />

      <section className="panel dept-panel">
        <h2>Department wise summary</h2>
        <DepartmentBreakdown rows={byDepartment} />
      </section>

      <section className="panel">
        <div className="panel__head">
          <h2>Student records</h2>
          <span className="panel__count">
            {visible.length} of {enriched.length} shown
          </span>
        </div>
        <Filters
          search={search}
          department={department}
          status={status}
          onSearch={setSearch}
          onDepartment={setDepartment}
          onStatus={setStatus}
          onReset={resetFilters}
        />
        <StudentTable
          students={visible}
          sort={sort}
          onSort={handleSort}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      </section>

      <StudentReport
        student={selected}
        onClose={() => setSelectedId(null)}
        onPrint={() => window.print()}
        onRemove={handleRemove}
      />
    </div>
  )
}

export default App
