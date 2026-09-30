// ==============================
// Variables
// ==============================

const name = "Angelin";
const lname = "Febiyal";
const age = 23;

// ==============================
// Object
// ==============================

const student = {
  name: "Angel",
  age: 23,
  department: "Computer Science",
};

// ==============================
// Boolean Variables
// ==============================

const isLogin = true;
const isAdmin = true;

// ==============================
// Array
// ==============================

const colors = ["Red", "Blue", "Green"];

// ==============================
// Number
// ==============================

const score = 90;

// ==============================
// Null & Empty Values
// ==============================

const username = null;
const city = "";

// ==============================
// Function
// ==============================

function greet() {
  return "Good Morning Students!";
}

// ==============================
// React Component
// ==============================

function Expression() {
  // Conditional Statement
  let result;

  if (score > 50) {
    result = "Pass";
  } else {
    result = "Fail";
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>JSX Expressions in React</h1>
      <hr />

      {/* ================= Variables ================= */}

      <h2>Variables</h2>

      <h3>Hello {name}</h3>

      <h3>
        Full Name : {name} {lname}
      </h3>

      <h3>Age : {age}</h3>

      <hr />

      {/* ================= Arithmetic Operators ================= */}

      <h2>Arithmetic Operators</h2>

      <h3>Addition : {15 + 45}</h3>

      <h3>Subtraction : {45 - 15}</h3>

      <h3>Multiplication : {15 * 45}</h3>

      <h3>Division : {45 / 15}</h3>

      <h3>Modulus : {45 % 15}</h3>

      <h3>Exponentiation : {15 ** 2}</h3>

      <hr />

      {/* ================= Comparison Operators ================= */}

      <h2>Comparison Operators</h2>

      <h3>45 &gt; 15 : {String(45 > 15)}</h3>

      <h3>45 &lt; 15 : {String(45 < 15)}</h3>

      <h3>45 &gt;= 15 : {String(45 >= 15)}</h3>

      <h3>45 &lt;= 15 : {String(45 <= 15)}</h3>

      <h3>45 == 15 : {String(45 == 15)}</h3>

      <h3>45 != 15 : {String(45 != 15)}</h3>

      <h3>45 === 45 : {String(45 === 45)}</h3>

      <h3>45 !== 15 : {String(45 !== 15)}</h3>

      <hr />

      {/* ================= Logical Operators ================= */}

      <h2>Logical Operators</h2>

      <h3>{true && "AND Operator (&&) : True"}</h3>

      <h3>{false || "OR Operator (||) : False becomes True"}</h3>

      <h3>{username ?? "Nullish Coalescing (??) : Guest"}</h3>

      <hr />

      {/* ================= String Expressions ================= */}

      <h2>String Expressions</h2>

      <h3>{name + " " + lname}</h3>

      <h3>{`Welcome ${name}`}</h3>

      <h3>{name.toUpperCase()}</h3>

      <h3>{name.toLowerCase()}</h3>

      <h3>{name.length}</h3>

      <hr />

      {/* ================= Function Call ================= */}

      <h2>Function Call</h2>

      <h3>{greet()}</h3>

      <hr />

      {/* ================= Object ================= */}

      <h2>Object</h2>

      <h3>Name : {student.name}</h3>

      <h3>Age : {student.age}</h3>

      <h3>Department : {student.department}</h3>

      <hr />

      {/* ================= Array ================= */}

      <h2>Array</h2>

      <h3>Second Color : {colors[1]}</h3>

      <hr />

      {/* ================= Conditional Rendering ================= */}

      <h2>Conditional Rendering</h2>

      <h3>{isLogin ? "Welcome User" : "Please Login"}</h3>

      {isAdmin && <h3>Admin Panel</h3>}

      <h3>Result : {result}</h3>

      <h3>{age >= 18 ? "Adult" : "Minor"}</h3>

      <hr />

      {/* ================= Array Mapping ================= */}

      <h2>Array Mapping</h2>

      {colors.map((color, index) => (
        <p key={index}>{color}</p>
      ))}

      <hr />

      {/* ================= Math Functions ================= */}

      <h2>Math Functions</h2>

      <h3>Random Number : {Math.random()}</h3>

      <h3>Maximum : {Math.max(10, 20, 30)}</h3>

      <h3>Minimum : {Math.min(10, 20, 30)}</h3>

      <h3>Square Root : {Math.sqrt(81)}</h3>

      <h3>Power : {Math.pow(5, 2)}</h3>

      <hr />

      {/* ================= Date ================= */}

      <h2>Date</h2>

      <h3>{new Date().toLocaleDateString()}</h3>

      <h3>{new Date().toLocaleTimeString()}</h3>

      <hr />



      {/* ================= Default Values ================= */}

      <h2>Default Values</h2>

      <h3>City : {city || "Chennai"}</h3>

      <h3>Username : {username ?? "Guest"}</h3>

      <hr />

      {/* ================= Boolean Expressions ================= */}

      <h2>Boolean Expressions</h2>

      <h3>{String(true)}</h3>

      <h3>{String(false)}</h3>

      <h3>{String(age > 18)}</h3>

      <hr />

      {/* ================= Nested Expression ================= */}

      <h2>Nested Expression</h2>

      <h3>{score > 50 ? `Pass (${score})` : "Fail"}</h3>
    </div>
  );
}

export default Expression;