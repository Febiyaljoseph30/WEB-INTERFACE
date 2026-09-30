import { departments, attendanceThreshold } from '../data/students.js'

const gradeScale = [
  { min: 90, point: 10, letter: 'O' },
  { min: 80, point: 9, letter: 'A+' },
  { min: 70, point: 8, letter: 'A' },
  { min: 60, point: 7, letter: 'B+' },
  { min: 50, point: 6, letter: 'B' },
  { min: 40, point: 5, letter: 'C' },
  { min: 0, point: 0, letter: 'F' },
]

export const passMark = 40

export function gradeFor(marks) {
  return gradeScale.find((g) => marks >= g.min) ?? gradeScale[gradeScale.length - 1]
}

export function attendancePercent(student) {
  const { held, attended } = student.attendance
  if (!held) return 0
  return Math.round((attended / held) * 1000) / 10
}

export function subjectRows(student) {
  const dept = departments[student.department]
  return dept.subjects.map((subject) => {
    const marks = student.marks[subject.code] ?? 0
    const grade = gradeFor(marks)
    return {
      ...subject,
      marks,
      grade,
      passed: marks >= passMark,
    }
  })
}

export function computeCgpa(student) {
  const rows = subjectRows(student)
  const totalCredits = rows.reduce((sum, r) => sum + r.credits, 0)
  if (!totalCredits) return 0
  const weighted = rows.reduce((sum, r) => sum + r.grade.point * r.credits, 0)
  return Math.round((weighted / totalCredits) * 100) / 100
}

export function statusFor(student) {
  const rows = subjectRows(student)
  const hasFail = rows.some((r) => !r.passed)
  const shortAttendance = attendancePercent(student) < attendanceThreshold

  if (hasFail) return { key: 'fail', label: 'Fail', tone: 'bad' }
  if (shortAttendance) return { key: 'at-risk', label: 'At Risk', tone: 'warn' }
  if (student.cgpa >= 9) return { key: 'distinction', label: 'Distinction', tone: 'best' }
  if (student.cgpa >= 7.5) return { key: 'first', label: 'First Class', tone: 'good' }
  if (student.cgpa >= 6) return { key: 'second', label: 'Second Class', tone: 'good' }
  return { key: 'pass', label: 'Pass', tone: 'ok' }
}

export function remarkFor(student) {
  const status = statusFor(student)
  const attendance = attendancePercent(student)

  if (status.key === 'fail') return 'Requisition for re-examination is advised.'
  if (attendance < attendanceThreshold)
    return `Attendance is below ${attendanceThreshold}%. Detention risk, parent meeting required.`

  switch (status.key) {
    case 'distinction':
      return 'Outstanding performance across all subjects. Recommended for merit scholarship.'
    case 'first':
      return 'Very good performance. Continue the same preparation level.'
    case 'second':
      return 'Satisfactory performance. Focus on the subjects scored below 70.'
    default:
      return 'Passed all subjects. Extra study in the weaker subjects will improve the CGPA.'
  }
}

export function enrich(student) {
  const cgpa = computeCgpa(student)
  const withCgpa = { ...student, cgpa }
  return { ...withCgpa, status: statusFor(withCgpa), attendancePercent: attendancePercent(withCgpa) }
}

export function summarize(students) {
  const total = students.length
  if (!total) {
    return { total: 0, avgCgpa: 0, avgAttendance: 0, passRate: 0, atRisk: 0, bestCgpa: 0 }
  }

  const sum = students.reduce(
    (acc, s) => ({
      cgpa: acc.cgpa + s.cgpa,
      attendance: acc.attendance + s.attendancePercent,
    }),
    { cgpa: 0, attendance: 0 },
  )

  const passed = students.filter((s) => s.status.key !== 'fail').length
  const atRisk = students.filter((s) => s.attendancePercent < attendanceThreshold).length
  const bestCgpa = students.reduce((max, s) => Math.max(max, s.cgpa), 0)

  return {
    total,
    avgCgpa: Math.round((sum.cgpa / total) * 100) / 100,
    avgAttendance: Math.round((sum.attendance / total) * 10) / 10,
    passRate: Math.round((passed / total) * 100),
    atRisk,
    bestCgpa,
  }
}

export function departmentSummary(students) {
  const groups = new Map()
  for (const student of students) {
    if (!groups.has(student.department)) groups.set(student.department, [])
    groups.get(student.department).push(student)
  }

  return [...groups.entries()].map(([code, members]) => {
    const dept = departments[code]
    return {
      code,
      name: dept.name,
      count: members.length,
      avgCgpa: Math.round((members.reduce((sum, s) => sum + s.cgpa, 0) / members.length) * 100) / 100,
      avgAttendance:
        Math.round((members.reduce((sum, s) => sum + s.attendancePercent, 0) / members.length) * 10) / 10,
    }
  })
}
