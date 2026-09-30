import { useState } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState("Dashboard");

  const skills = ["Java", "React", "Python", "SQL"];

  const projects = ["Student Dashboard", "Library Management"];

  return (
    <div className="app">

      <div className="sidebar">

        <h2>CareerHub</h2>

        <button onClick={() => setPage("Dashboard")}>
          Dashboard
        </button>

        <button onClick={() => setPage("Profile")}>
          Profile
        </button>

        <button onClick={() => setPage("Skills")}>
          🛠 Skills
        </button>

        <button onClick={() => setPage("Projects")}>
          Projects
        </button>

      </div>

      <div className="main">

        <h1>{page}</h1>

        {page === "Dashboard" && (
          <div className="box">

            <h2>Welcome,J ANGELIN FEBIYAL</h2>

            <p> ENGINEERING Student</p>

            <h3>CGPA: 8.6</h3>

          </div>
        )}

        {page === "Profile" && (
          <div className="box">

            <h2>J ANGELIN FEBIYAL</h2>

            <p>Department: AIDS</p>

            <p>Year: 2nd Year</p>

            <p>Semester: 3rd Semester</p>

            <p>CGPA: 8.6</p>

          </div>
        )}

        {page === "Skills" && (
          <div className="box">

            <h2>My Skills</h2>

            {skills.map((skill) => (
              <span className="skill" key={skill}>
                {skill}
              </span>
            ))}

          </div>
        )}

        {page === "Projects" && (
          <div className="box">

            <h2>My Projects</h2>

            {projects.map((project) => (
              <p key={project}>
                {project}
              </p>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default App;
