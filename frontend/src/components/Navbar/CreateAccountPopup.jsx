import { useState } from "react";
import "./Navbar.css";

//Connecting create account pop up to backend
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

// create account popup button and component creater
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

// Reuseable Input component
function Input({ label, type, value, setter, errorName, errorField }) {
  return (
    <div className="input-group">
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => setter(e.target.value)}
        aria-invalid={errorName === errorName}
        aria-describedby={
          errorField == errorName ? `${errorName}-error` : undefined
        }
        style={
          errorField == errorName
            ? {
                borderColor: "#dc3545",
                boxShadow: "0 0 0 3px rgba(220,53,69,0.08)",
              }
            : undefined
        }
      />
    </div>
  );
}

// Checking if passwords match and validating password
function PasswordMatch(password, confirmPassword) {
  return password === confirmPassword;
}
function ValidatePassword(password) {
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
    hasSpecialChar
  );
}

function Popup({ togglePopup }) {
  // Defining all the variables
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorField, setErrorField] = useState("");
  const [errorName, setError] = useState("");
  // Defining the style for the error messages
  const errorStyles = {
    background: "#fff5f5",
    border: "1px solid #f5c2c7",
    color: "#842029",
    padding: "8px 10px",
    borderRadius: 6,
    fontSize: 13,
    marginTop: 6,
    width: "100%",
  };

  // Checking what the error is
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim().length === 0) {
      setError("Username cannot be empty.");
      setErrorField("username");
      return;
    }
    if (email.trim().length === 0) {
      setError("Email cannot be empty.");
      setErrorField("email");
      return;
    }
    if (!PasswordMatch(password, confirmPassword)) {
      setError("Passwords do not match.");
      setErrorField("confirmPassword");
      return;
    }
    if (!ValidatePassword(password)) {
      setError(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
      );
      setErrorField("password");
      return;
    }

    // success (no errors)
    setError("");
    setErrorField("");
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
    togglePopup();

    AddUser(username, email, password);
  };

  // HTML for the popup
  return (
    <>
      <div className="create-account-backdrop" role="dialog" aria-modal="true">
        <div className="popup-box">
          <div className="box">
            <span className="close-icon" onClick={togglePopup}>
              x
            </span>

            <h2>Create Account</h2>
            <form onSubmit={handleSubmit}>
              <Input
                label="Username:"
                type="text"
                value={username}
                setter={setUsername}
                errorName="username"
                errorField={errorField}
              />
              {errorField === "username" && (
                <div id="username-error" style={errorStyles} role="alert">
                  {errorName}
                </div>
              )}
              <Input
                label="Email:"
                type="text"
                value={email}
                setter={setEmail}
                errorName="email"
                errorField={errorField}
              />
              {errorField === "email" && (
                <div id="email-error" style={errorStyles}>
                  {errorName}
                </div>
              )}
              <Input
                label="Password:"
                type="password"
                value={password}
                setter={setPassword}
                errorName="password"
                errorField={errorField}
              />
              {errorField === "password" && (
                <div id="password-error" style={errorStyles}>
                  {errorName}
                </div>
              )}
              <Input
                label="Confirm Password:"
                type="password"
                value={confirmPassword}
                setter={setConfirmPassword}
                errorName="confirmPassword"
                errorField={errorField}
              />
              {errorField === "confirmPassword" && (
                <div id="confirmPassword-error" style={errorStyles}>
                  {errorName}
                </div>
              )}
              <button type="submit">Create Account</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateAccountPopup;
