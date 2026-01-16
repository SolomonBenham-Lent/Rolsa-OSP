import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
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

function validation(username, password) {
  if (username.length === 0 || password.length === 0) {
    alert("Please fill in all fields.");
    return false;
  }
}

function Popup({ togglePopup }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); // Stop page reload

    try {
      // 1. Send username/password to Python
      // Make sure this URL matches your Python route EXACTLY
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username, password: password }), // Make sure these variables match your state
      });

      const data = await response.json();

      if (data.success) {
        // Save user and redirect
        sessionStorage.setItem("currentUser", JSON.stringify(data.user));
        alert("Login Successful!");
        togglePopup();
        window.location.href = "/profile";
      } else {
        alert("Login Failed: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error. Is Python running?");
    }
  };

  return (
    <div className="login-backdrop">
      <div className="popup-box" role="dialog" aria-modal="true">
        <div className="box">
          <span className="close-icon" onClick={togglePopup}>
            x
          </span>

          <form onSubmit={handleLogin}>
            <h2>Login</h2>
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
              <p>Email:</p>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
