import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

function CreateAccountPopup({ onCreateAccountOpen }) {
  const [seen, setSeen] = useState(false);
  const togglePopup = () => {
    setSeen((s) => !s);
  };

  return (
    <div className="create-account-popup-wrapper">
      <button className="create-account-btn" onClick={togglePopup}>
        Create Account
      </button>
      {seen && <Popup togglePopup={togglePopup} />}
    </div>
  );
}

function passwordMatch(password, confirmPassword) {
  return password === confirmPassword;
}

function validation(username, password, confirmPassword) {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return (
    password.length >= minLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumber &&
    hasSpecialChar &&
    passwordMatch(password, confirmPassword) &&
    username.length > 0
  );
}

function Popup({ togglePopup }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleCreateAccount(valid) {
    console.log("Username:", username);
    console.log("Password:", password);

    if (valid) {
      togglePopup();
    } else if (!passwordMatch(password, confirmPassword)) {
      alert("Password must match.");
    } else if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
    } else if (
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/[0-9]/.test(password) ||
      !/[!@#$%^&*(),.?":{}|<>]/.test(password)
    ) {
      alert(
        "Password must contain at least one uppercase letter, lowercase letter, number, and special character."
      );
    } else if (username.length === 0) {
      alert("Username cannot be empty.");
    }
  }

  return (
    <div className="create-account-backdrop">
      <div className="popup-box" role="dialog" aria-modal="true">
        <div className="box">
          <span className="close-icon" onClick={togglePopup}>
            x
          </span>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateAccount(
                validation(username, password, confirmPassword)
              );
            }}
          >
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
            <label>
              <p>Confirm Password:</p>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>
            <br />
            <button type="submit">Create Account</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateAccountPopup;
