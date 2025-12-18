import React from "react"
import { Routes, Route, Link } from "react-router-dom"
import './Footerbar.css'
import Copyright from "../../pages/copyright.jsx"
import Terms from "../../pages/terms.jsx"
import Accessibility_Terms from "../../pages/accessibilty_terms.jsx"
import Privacy from "../../pages/privacy.jsx"

const Footerbar = () => {
  return (
    <>
    <Routes>
      <Route path="copyright" element={<Copyright/>}/>
      <Route path="terms" element={<Terms/>}/>
      <Route path="accessibility_terms" element={<Accessibility_Terms/>}/>
      <Route path="privacy" element={<Privacy/>}/>
    </Routes>

    <footer className="footerbar">
        <Link to="copyright">Copyright Notice </Link>
        <Link to="terms">Terms of Service </Link>
        <Link to="accessibility_terms">Accessibility Terms </Link>
        <Link to="privacy">Privacy Policy </Link>
        <div className="footer_text">© 2025 Rolsa Technologies</div>
    </footer>
    </>
  )
}

export default Footerbar