import { useState } from "react";
import "./Navbar.css";

// Connecting login pop up to backend
const handleLogin = async (username, email, password) => {
  try {
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    });

    const data = await response.json();

    if (data.success) {
      alert("Login Successful!");
      //   togglePopup();
      window.location.href = "/profile";
    } else {
      alert("Login Failed: " + (data.message || "Unknown error"));
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Server error.");
  }
};

// create account popup button and component creater
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

function Popup({ togglePopup }) {
  // Defining all the variables
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorField, setErrorField] = useState("");
  const [errorName, setErrorName] = useState("");
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

  // Checking whether the account exists
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim().length === 0) {
      setErrorName("Username cannot be empty.");
      setErrorField("username");
      return;
    }
    if (password.trim().length === 0) {
      setErrorName("Password cannot be empty.");
      setErrorField("password");
      return;
    }
    if (email.trim().length === 0) {
      setErrorName("Email cannot be empty.");
      setErrorField("email");
      return;
    }

    // Success (no errors)
    setErrorName("");
    setErrorField("");
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
    togglePopup();

    handleLogin(username, email, password);
  };

  return (
    <div className="login-backdrop">
      <div className="popup-box" role="dialog" aria-modal="true">
        <div className="box">
          <span className="close-icon" onClick={togglePopup}>
            x
          </span>

          <h2>Login</h2>

          <form onSubmit={handleSubmit}>
            <Input
              label="Username"
              type="text"
              value={username}
              setter={setUsername}
              errorName={errorName}
              errorField={errorField}
            />
            {errorField === "username" && (
              <div id="username-error" style={errorStyles}>
                {errorName}
              </div>
            )}
            <Input
              label="Email"
              type="email"
              value={email}
              setter={setEmail}
              errorName={errorName}
              errorField={errorField}
            />
            {errorField === "email" && (
              <div id="email-error" style={errorStyles}>
                {errorName}
              </div>
            )}
            <Input
              label="Password"
              type="password"
              value={password}
              setter={setPassword}
              errorName={errorName}
              errorField={errorField}
            />
            {errorField === "password" && (
              <div id="password-error" style={errorStyles}>
                {errorName}
              </div>
            )}
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPopup;
