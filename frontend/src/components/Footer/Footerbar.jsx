import React from "react"
import { Routes, Route, Link } from "react-router-dom"
import './Footerbar.css'
import Copyright from "../../pages/copyright.jsx"
import Terms from "../../pages/terms.jsx"
import AccessibilityTerms from "../../pages/accessibiltyterms.jsx"
import Privacy from "../../pages/privacy.jsx"
import semi_circle from "../../assets/semi_circle.svg"

const Footerbar = () => {

  return (
    <>
    <footer className="footerbar">
        <Link to="copyright">Copyright Notice </Link>
        <Link to="terms">Terms of Service </Link>
        <Link to="accessibility_terms">Accessibility Terms </Link>
        <Link to="privacy">Privacy Policy </Link>
        <div className="footer_text">© 2025 Rolsa Technologies</div>
    </footer>

       <Routes>
        <Route path="copyright" element={<Copyright/>}/>
        <Route path="terms" element={<Terms/>}/>
        <Route path="accessibilityterms" element={<AccessibilityTerms/>}/>
        <Route path="privacy" element={<Privacy/>}/>
      </Routes>
    </>
  )
}

export default Footerbar