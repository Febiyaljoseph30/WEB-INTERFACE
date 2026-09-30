import Drawing from "./assets/drawing.jpg";
import Dancing from "./assets/dancing.jpg";
import Singing from "./assets/sining.jpg";
import Cycling from "./assets/Cycling.jpg";
import Gardening from "./assets/gandering.jpg";
import Movie from "./assets/moving.jpg";
import "./App.css";

// Child component
function HobbyCard(props) {
  return (
    <div className="card">
      <img
        src={props.image}
        alt={props.hobby}
      />

      <h2>{props.hobby}</h2>

      <p>{props.description}</p>
    </div>
  );
}

// Parent component
function Hobby() {
  return (
    <div>
      <h1>My Hobbies</h1>

      <div className="hobby-container">
  
        <HobbyCard
          image={Drawing}
          hobby="Drawing"
          description="I enjoy drawing and creating new things."
        />

        <HobbyCard
          image={Dancing}
          hobby="Dancing"
          description="I love dancing to my favorite songs."
        />

        <HobbyCard
          image={Singing}
          hobby="Singing"
          description="I like singing my favorite songs."
        />

        <HobbyCard
          image={Cycling}
          hobby="Cycling"
          description="I enjoy cycling in my free time."
        />

        <HobbyCard
          image={Gardening}
          hobby="Gardening"
          description="I enjoy taking care of plants."
        />

        <HobbyCard
          image={Movie}
          hobby="Watching Movies"
          description="I enjoy watching interesting movies."
        />

      </div>
    </div>
  );
}

export default Hobby;