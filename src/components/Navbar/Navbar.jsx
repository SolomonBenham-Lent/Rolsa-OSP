import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./Navbar.css";
import Home from "../../pages/home.jsx";
import Calculator from "../../pages/calculator.jsx";
import Booking from "../../pages/booking.jsx";
import logo from "../../assets/rolsa_logo.svg";
import LoginPopup from "./Login_pop_up.jsx";
import NavDropdown from "./drop_down.jsx";
import Tracker from "../../pages/tracker.jsx";
import CreateAccountPopup from "./create_account_pop_up.jsx";

const Navbar = () => {
  return (
    <>
      <nav className="top_nav">
        <div className="logo">
          <Link to="home" className="logo">
            <img src={logo} alt="Rolsa Logo" />
            <label htmlFor="home"></label>
          </Link>
        </div>

        <Link to="home">Home</Link>
        <Link to="booking">Booking</Link>
        <NavDropdown />
        <LoginPopup />
        <CreateAccountPopup />
      </nav>

      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="booking" element={<Booking />} />
        <Route path="calculator" element={<Calculator />} />
        <Route path="tracker" element={<Tracker />} />
      </Routes>
    </>
  );
};

export default Navbar;
