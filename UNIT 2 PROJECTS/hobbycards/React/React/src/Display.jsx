import "./App.css";
/*import { FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";*/
function Header(props) {
  return (
    <header>
      <div className="profile">
        <p className="small-title">PERSONAL PROFILE</p>
        <h1>{props.title}</h1>
        <p>{props.subtitle}</p>
      </div>

      <div className="circle">AM</div>
    </header>
  );
}

function About(props) {
  return (
    <section>
      <h2><span>01</span> ABOUT</h2>
      <p>{props.about}</p>
    </section>
  );
}

function Skills() {
  const skills = [
    "JavaScript",
    "React",
    "HTML5 & CSS3",
    "Node.js",
    "Git & GitHub"
  ];

  return (
    <section>
      <h2><span>02</span> SKILLS</h2>

      <div className="skills">
        {skills.map((skill, index) => (
          <div className="skill" key={index}>
            {skill}
          </div>
        ))}
      </div>
    </section>
  );
}

function Goal(props) {
  return (
    <section>
      <h2><span>03</span> GOAL</h2>
      <p>{props.goal}</p>
    </section>
  );
}

function Contact(props) {
  return (
    <section>
      <h2><span>04</span> CONTACT</h2>

      <div className="contact">
        <p>
          <label>EMAIL</label>
          <strong>{props.email}</strong>
        </p>

        <p>
          <label>PHONE</label>
          <strong>{props.phone}</strong>
        </p>

        <p>
          <label>GITHUB</label>
          <strong>{props.github}</strong>
        </p>
      </div>
    </section>
  );
}
function Footer() {
  return (

<footer className="footer"> 
 
  <div className="footer-skills">
     <h3>Skills</h3> 
    <p>JavaScript</p>
     <p>React</p> 
     <p>HTML5 & CSS3</p> 
     <p>Node.js</p> 
     <p>Git & GitHub</p> 
  </div>
    <h3>Connect</h3>
      <div className="footer-icons">
  </div>
           <p id="footer-text">Designed & built with React · © 2026 Pradeep</p> 
 </footer>
  )}
function Display() {
  return (
    <div className="container">

      <Header
        title="Angel"
        subtitle="Frontend Developer · React Enthusiast"
      />

      <About
        about="I'm a frontend developer who enjoys turning ideas into clean, usable interfaces. I like breaking big problems into small components, matching how I write code as much as how I explain it."
      />

      <Skills />

      <Goal
        goal="To grow as a full-stack developer by contributing to projects that solve real problems, while continually sharpening my skills in modern web technologies and collaborative teams."
      />

      <Contact
        email="Anelin@example.com"
        phone="+91 8778478242"
        github="github.com/angel"
      />

      <Footer />

    </div>
  );
}

export default Display;