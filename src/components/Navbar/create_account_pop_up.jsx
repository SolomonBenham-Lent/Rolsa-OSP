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
    username.trim().length > 0
  );
}

function Popup({ togglePopup }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [errorField, setErrorField] = useState("");
  const errorStyle = {
    background: "#fff5f5",
    border: "1px solid #f5c2c7",
    color: "#842029",
    padding: "8px 10px",
    borderRadius: 6,
    fontSize: 13,
    marginTop: 6,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim().length === 0) {
      setError("Username cannot be empty.");
      setErrorField("username");
      return;
    }
    if (!passwordMatch(password, confirmPassword)) {
      setError("Passwords do not match.");
      setErrorField("confirmPassword");
      return;
    }
    if (!validation(username, password, confirmPassword)) {
      setError(
        "Password must be at least 8 characters and include uppercase, lowercase, a number, and a special character."
      );
      setErrorField("password");
      return;
    }

    // success
    setError("");
    setErrorField("");
    console.log("Username:", username);
    console.log("Password:", password);
    togglePopup();
  };

  return (
    <div className="create-account-backdrop">
      <div className="popup-box" role="dialog" aria-modal="true">
        <div className="box">
          <span className="close-icon" onClick={togglePopup}>
            x
          </span>          


          <h2>Create Account</h2>
          <form onSubmit={handleSubmit}>
            <label>
              <p>Username:</p>
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (errorField === "username") {
                    setError("");
                    setErrorField("");
                  }
                }}
                aria-invalid={errorField === "username"}
                aria-describedby={errorField === "username" ? "username-error" : undefined}
                style={
                  errorField === "username"
                    ? { borderColor: "#dc3545", boxShadow: "0 0 0 3px rgba(220,53,69,0.08)" }
                    : undefined
                }
              />
              {errorField === "username" && error && (
                <div id="username-error" role="alert" style={errorStyle}>
                  {error}
                </div>
              )}
            </label>
            <br />
            <label>
              <p>Password:</p>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errorField === "password") {
                    setError("");
                    setErrorField("");
                  }
                }}
                aria-invalid={errorField === "password"}
                aria-describedby={errorField === "password" ? "password-error" : undefined}
                style={
                  errorField === "password"
                    ? { borderColor: "#dc3545", boxShadow: "0 0 0 3px rgba(220,53,69,0.08)" }
                    : undefined
                }
              />
              {errorField === "password" && error && (
                <div id="password-error" role="alert" style={errorStyle}>
                  {error}
                </div>
              )}
            </label>
            <br />
            <label>
              <p>Confirm Password:</p>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errorField === "confirmPassword") {
                    setError("");
                    setErrorField("");
                  }
                }}
                aria-invalid={errorField === "confirmPassword"}
                aria-describedby={errorField === "confirmPassword" ? "confirmPassword-error" : undefined}
                style={
                  errorField === "confirmPassword"
                    ? { borderColor: "#dc3545", boxShadow: "0 0 0 3px rgba(220,53,69,0.08)" }
                    : undefined
                }
              />
              {errorField === "confirmPassword" && error && (
                <div id="confirmPassword-error" role="alert" style={errorStyle}>
                  {error}
                </div>
              )}
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
