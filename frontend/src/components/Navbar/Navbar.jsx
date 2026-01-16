import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./Navbar.css";
import Home from "../../pages/home.jsx";
import Calculator from "../../pages/calculator.jsx";
import Booking from "../../pages/booking.jsx";
import logo from "../../assets/rolsa_logo.svg";

//import LoginPopup from "./Login_pop_up.jsx";
import LoginPopup from "./LoginPopup.jsx";

import NavDropdown from "./drop_down.jsx";
import Tracker from "../../pages/tracker.jsx";

//import CreateAccountPopup from "./create_account_pop_up.jsx";
import CreateAccountPopup from "./CreateAccountPopup.jsx";

import ham_menu from "../../assets/menu_icon.svg";
import Tips from "../../pages/tips.jsx";
import Profile from "../../pages/profile.jsx";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  return (
    <>
      <nav className="top_nav">
        <div className="logo">
          <Link to="home" className="logo">
            <img src={logo} alt="Rolsa Logo" />
            <label htmlFor="home"></label>
          </Link>
        </div>

        <button
          className="hamburger"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <img src={ham_menu} alt="menu icon" />
        </button>

        <div className={isOpen ? "nav-links open" : "nav-links"}>
          <Link to="home">Home</Link>
          <Link to="booking">Booking</Link>
          <Link to="profile">Profile</Link>
          <NavDropdown />

          <div className="auth-btn">
            <LoginPopup />
            <CreateAccountPopup />
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="booking" element={<Booking />} />
        <Route path="calculator" element={<Calculator />} />
        <Route path="tracker" element={<Tracker />} />
        <Route path="tips" element={<Tips />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default Navbar;
