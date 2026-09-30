# Student Performance Report &mdash; Unit 5

A college result-analytics website built with React 19 and Vite 8. It ships with
15 default student records across 4 departments and generates a printable report
card for each student.

## Features

- **Summary dashboard** &mdash; total students, average CGPA, average attendance,
  pass rate, attendance-risk count and highest CGPA.
- **Department wise summary** &mdash; student count, average CGPA and average
  attendance per department, with a CGPA bar.
- **Search and filter** &mdash; filter by department, by result status, and search
  by student name or roll number.
- **Sortable table** &mdash; click any column header to sort ascending or descending.
- **Full report card** &mdash; subject wise marks, credits, grade points, pass or
  fail per subject, attendance split, and a generated remark.
- **Print / Save as PDF** &mdash; a dedicated print stylesheet prints only the
  report card.
- **Add a record** &mdash; validated form that appends a new student, and a delete
  action on the report card.

## Grading logic

| Marks | Grade point | Letter |
| ----- | ----------- | ------ |
| 90+   | 10          | O      |
| 80+   | 9           | A+     |
| 70+   | 8           | A      |
| 60+   | 7           | B+     |
| 50+   | 6           | B      |
| 40+   | 5           | C      |
| below 40 | 0        | F      |

`CGPA = sum(grade point x credits) / sum(credits)`

A student is marked **Fail** if any subject is below 40, **At Risk** if attendance
falls below 75%, and otherwise **Distinction** (CGPA 9+), **First Class** (7.5+),
**Second Class** (6+) or **Pass**.

## Project structure

```
src/
  data/students.js        departments, subject lists and the default records
  utils/report.js         grade points, CGPA, attendance and status calculation
  components/
    SummaryCards.jsx      dashboard stat tiles
    DepartmentBreakdown.jsx
    Filters.jsx           search, department and status filters
    StudentTable.jsx      sortable student list
    StudentReport.jsx     detailed report card + print
    AddStudentForm.jsx    validated add-record form
  App.jsx                 state, filtering, sorting
```

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build
npm run lint     # eslint
npm run preview  # preview the production build
```
