import { useState } from 'react'
import './AddStudentForm.css'
import { departmentList } from '../data/students.js'
import { passMark } from '../utils/report.js'

const emptyForm = () => ({
  rollNo: '',
  name: '',
  department: 'CSE',
  year: 2,
  semester: 4,
  section: 'A',
  held: '',
  attended: '',
})

function validate(form, subjects) {
  const errors = {}

  if (!form.rollNo.trim()) errors.rollNo = 'Roll number is required'
  if (!form.name.trim()) errors.name = 'Name is required'

  const held = Number(form.held)
  const attended = Number(form.attended)
  if (!form.held || held <= 0) errors.held = 'Classes held must be greater than 0'
  if (form.attended === '' || Number.isNaN(attended)) errors.attended = 'Classes attended is required'
  else if (attended > held) errors.attended = 'Attended cannot be more than held'

  for (const subject of subjects) {
    const value = form.marks[subject.code]
    if (value === '' || value === undefined) {
      errors[subject.code] = 'Required'
    } else if (Number.isNaN(Number(value)) || Number(value) < 0 || Number(value) > 100) {
      errors[subject.code] = '0 - 100'
    }
  }

  return errors
}

function AddStudentForm({ onAdd }) {
  const [form, setForm] = useState(emptyForm)
  const [marks, setMarks] = useState({})
  const [errors, setErrors] = useState({})
  const [open, setOpen] = useState(false)
  const [saved, setSaved] = useState(false)

  const subjects =
    departmentList.find((d) => d.code === form.department)?.subjects ?? []

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
    setSaved(false)
  }

  function changeDepartment(code) {
    setForm((prev) => ({ ...prev, department: code }))
    setMarks({})
    setErrors({})
    setSaved(false)
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validate({ ...form, marks }, subjects)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    const cleanMarks = {}
    for (const subject of subjects) cleanMarks[subject.code] = Number(marks[subject.code])

    onAdd({
      rollNo: form.rollNo.trim().toUpperCase(),
      name: form.name.trim(),
      department: form.department,
      year: Number(form.year),
      semester: Number(form.semester),
      section: form.section.trim().toUpperCase(),
      attendance: { held: Number(form.held), attended: Number(form.attended) },
      marks: cleanMarks,
    })

    setForm(emptyForm())
    setMarks({})
    setErrors({})
    setOpen(false)
    setSaved(true)
  }

  if (!open) {
    return (
      <div className="add-form__wrap">
        <button type="button" className="btn btn--primary" onClick={() => setOpen(true)}>
          + Add student record
        </button>
        {saved ? <span className="add-form__saved">Record added to the list.</span> : null}
      </div>
    )
  }

  return (
    <form className="add-form" onSubmit={handleSubmit} noValidate>
      <div className="add-form__head">
        <h3>New student record</h3>
        <button type="button" className="add-form__close" onClick={() => setOpen(false)}>
          Cancel
        </button>
      </div>

      <div className="add-form__grid">
        <label>
          <span>Roll number *</span>
          <input
            value={form.rollNo}
            onChange={(e) => update('rollNo', e.target.value)}
            placeholder="CSE2406"
          />
          {errors.rollNo ? <em className="err">{errors.rollNo}</em> : null}
        </label>

        <label>
          <span>Full name *</span>
          <input value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Student name" />
          {errors.name ? <em className="err">{errors.name}</em> : null}
        </label>

        <label>
          <span>Department *</span>
          <select value={form.department} onChange={(e) => changeDepartment(e.target.value)}>
            {departmentList.map((d) => (
              <option key={d.code} value={d.code}>
                {d.code}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>Section *</span>
          <input value={form.section} onChange={(e) => update('section', e.target.value)} maxLength={2} />
        </label>

        <label>
          <span>Year *</span>
          <input
            type="number"
            min="1"
            max="4"
            value={form.year}
            onChange={(e) => update('year', e.target.value)}
          />
        </label>

        <label>
          <span>Semester *</span>
          <input
            type="number"
            min="1"
            max="10"
            value={form.semester}
            onChange={(e) => update('semester', e.target.value)}
          />
        </label>

        <label>
          <span>Classes held *</span>
          <input
            type="number"
            min="1"
            value={form.held}
            onChange={(e) => update('held', e.target.value)}
            placeholder="240"
          />
          {errors.held ? <em className="err">{errors.held}</em> : null}
        </label>

        <label>
          <span>Classes attended *</span>
          <input
            type="number"
            min="0"
            value={form.attended}
            onChange={(e) => update('attended', e.target.value)}
            placeholder="219"
          />
          {errors.attended ? <em className="err">{errors.attended}</em> : null}
        </label>
      </div>

      <h4 className="add-form__subtitle">
        Subject marks (out of 100, pass mark {passMark})
      </h4>
      <div className="add-form__marks">
        {subjects.map((subject) => (
          <label key={subject.code}>
            <span>
              {subject.code}
              <em>{subject.name}</em>
            </span>
            <input
              type="number"
              min="0"
              max="100"
              value={marks[subject.code] ?? ''}
              onChange={(e) => {
                setMarks((prev) => ({ ...prev, [subject.code]: e.target.value }))
                setSaved(false)
              }}
            />
            {errors[subject.code] ? <em className="err">{errors[subject.code]}</em> : null}
          </label>
        ))}
      </div>

      <div className="add-form__actions">
        <button type="submit" className="btn btn--primary">
          Save record
        </button>
        <button type="button" className="btn" onClick={() => setOpen(false)}>
          Discard
        </button>
      </div>
    </form>
  )
}

export default AddStudentForm
