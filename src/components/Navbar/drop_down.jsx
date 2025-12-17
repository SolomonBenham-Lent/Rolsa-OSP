import React, { useState } from "react";
import './Navbar.css'
import { Link } from "react-router-dom";




function NavDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => setIsOpen(!isOpen); 
    return (
        <div className="dropdown">
            <button className="dropbtn" onClick={toggleDropdown}>Co2</button>
            {isOpen && (

                <div className="dropdown-content">
                    <ul>
                        <Link to="/calculator">Calculator</Link>
                        <Link to="/tracker">Tracker</Link>
                        <Link to="/tips">Tips</Link>
                    </ul>
                </div>
                
            )}
        </div>
    );
}

export default NavDropdown;