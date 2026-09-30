
const name = "Angel";
const marks = 92;

function Profile() {
  return (
    <div
      style={{
        width: "280px",
        margin: "30px auto",
        padding: "20px",
        border: "2px solid black",
        borderRadius: "10px",
        backgroundColor:"#f0f0f0",
        textAlign: "center",
      }}
    >
      <img
        src={Image}
        alt="Student"
        style={{
          width: "150px",
          height: "180px",
          borderRadius: "10px",
          objectFit:"cover",
        }}
      />

      <h2>Name: {name}</h2>
      <h3>Marks: {marks}</h3>
    </div>
  );
}

export default Profile;