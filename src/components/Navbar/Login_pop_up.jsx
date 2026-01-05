import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import GoogleLogin from "./GoogleLogin";
import CreateAccountPopup from "./create_account_pop_up";

function LoginPopup() {
  const [seen, setSeen] = useState(false);
  const togglePopup = () => setSeen((s) => !s);

  return (
    <div className="login-popup-wrapper">
      <button className="login-btn" onClick={togglePopup}>
        Log in
      </button>
      {seen && <Popup togglePopup={togglePopup} />}
    </div>
  );
}

function Popup({ togglePopup }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
    togglePopup();
  }

  return (
    <div className="login-backdrop">
      <div className="popup-box" role="dialog" aria-modal="true">
        <div className="box">
          <span className="close-icon" onClick={togglePopup}>
            x
          </span>
          <form onSubmit={handleLogin}>
            <label>
              <p>Username:</p>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <br />
            <label>
              <p>Password:</p>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <br />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPopup;
