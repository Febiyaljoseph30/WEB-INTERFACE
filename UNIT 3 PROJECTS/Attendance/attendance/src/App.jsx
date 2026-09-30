import { useState } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([
    { id: 1, name: "Febiyal", status: "Absent" },
    { id: 2, name: "Abishek", status: "Absent" },
    { id: 3, name: "Meera", status: "Absent" },
    { id: 4, name: "Nethra", status: "Absent" },
    { id: 5, name: "Roshini", status: "Absent" },
    { id: 6, name: "Malini", status: "Absent" },
    { id: 7, name: "Pradeep", status: "Absent" },
    { id: 8, name: "Bhava", status: "Absent" },
    { id: 9, name: "Shiney", status: "Absent" },
    { id: 10, name: "Nivetha", status: "Absent" },
  ]);

  function changeStatus(id) {
    setStudents(
      students.map((student) =>
        student.id === id
          ? {
              ...student,
              status: student.status === "Present" ? "Absent" : "Present"
            }
          : student
      )
    );
  }

  const presentCount = students.filter(
    (student) => student.status === "Present"
  ).length;

  const absentCount = students.filter(
    (student) => student.status === "Absent"
  ).length;

  return (
    <div className="app">
      <h1>Attendance Tracker</h1>

      <div className="summary">
        <div className="box">
          <h3>Total Students</h3>
          <p>{students.length}</p>
        </div>

        <div className="box present">
          <h3>Present</h3>
          <p>{presentCount}</p>
        </div>

        <div className="box absent">
          <h3>Absent</h3>
          <p>{absentCount}</p>
        </div>
      </div>

      <div className="attendance-card">
        <h2>Student Attendance</h2>

        {students.map((student) => (
          <div className="student" key={student.id}>
            <span>{student.name}</span>

            <button
              className={
                student.status === "Present" ? "present-btn" : "absent-btn"
              }
              onClick={() => changeStatus(student.id)}
            >
              {student.status}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;