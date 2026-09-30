import { useState } from "react";

function Signup() {
  const [sameAddress, setSameAddress] = useState(false);

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>

      <form>
        <label>Username:</label>
        <input type="text" />

        <label>Email:</label>
        <input type="email" />

        <label>Password:</label>
        <input type="password" />

        <label>Confirm Password:</label>
        <input
          type="password"
          placeholder="Reenter your password"
        />

        <label>Permanent Address:</label>
        <textarea placeholder="Enter permanent address"></textarea>

        <div className="checkbox-area">
          <input
            type="checkbox"
            checked={sameAddress}
            onChange={(e) => setSameAddress(e.target.checked)}
          />
        </div>

        <div className="same-text">
          Same as Permanent Address
        </div>
      </form>
    </div>
  );
}

export default Signup;