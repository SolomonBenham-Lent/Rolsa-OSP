import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const AddUser = async (username, email, password) => {
  try {
    const response = await fetch("http://localhost:5000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });
    if (response.ok) {
      alert("Successfully created account!");
    } else {
      alert("Failed to create account.");
    }
  } catch (error) {
    console.error("Error adding user:", error);
  }
};

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

function Input({ type, value, setter, errorName, errorField }) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => {
        setter(e.target.value);
      }}
      aria-invalid={errorField === errorName}
      aria-describedby={
        errorField === errorName ? `${errorName}-error` : undefined
      }
      style={
        errorField === errorName
          ? {
              borderColor: "#dc3545",
              boxShadow: "0 0 0 3px rgba(220,53,69,0.08)",
            }
          : undefined
      }
    />
  );
}

function Popup({ togglePopup }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
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
    width: "100%",
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
    console.log("Email:", email);
    console.log("Password:", password);
    togglePopup();

    AddUser(username, email, password);
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
              <Input
                type="text"
                value={username}
                setter={setUsername}
                errorName="username"
                errorField={errorField}
              />
              {errorField === "username" && error && (
                <div id="username-error" role="alert" style={errorStyle}>
                  {error}
                </div>
              )}
            </label>
            <br />
            <label>
              <p>Email:</p>
              <Input
                type="text"
                value={email}
                setter={setEmail}
                errorName="email"
                errorField={errorField}
              />
              {errorField === "email" && error && (
                <div id="email-error" role="alert" style={errorStyle}>
                  {error}
                </div>
              )}
            </label>
            <br />
            <label>
              <p>Password:</p>
              <Input
                type="password"
                value={password}
                setter={setPassword}
                errorName="password"
                errorField={errorField}
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
              <Input
                type="password"
                value={confirmPassword}
                setter={setConfirmPassword}
                errorName="confirmPassword"
                errorField={errorField}
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
