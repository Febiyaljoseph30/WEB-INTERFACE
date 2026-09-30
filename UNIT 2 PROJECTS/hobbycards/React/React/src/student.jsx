import { useState } from "react";
 function Student() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Student Portal</h1>

      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? "Hide Details" : "Show Details"}
      </button>

      {showDetails && (
        <div
          style={{
            width: "300px",
            margin: "20px auto",
            padding: "20px",
            border: "2px solid blue",
            borderRadius: "10px",
            backgroundColor: "#f0f8ff",
          }}
        >
          <h2>Student Profile</h2>
          <p>Name: Angelin</p>
          <p>Roll No: 004</p>
          <p>Department: AIDS</p>
          <p>Year: 2nd Year</p>
        </div>
      )}
    </div>
  );
}

export default Student;