import react from "react"
import './Navbar.css'

const Navbar = () => {
  return (
    <header>
        <div className="top_nav">
          <a href="main page" target="_blank"></a>
          <a href="co2">Co2 Calculator</a>
          <a href="tracker">Tracker</a>
          <a href="booking">Booking</a>
          <a href="login">Login</a>
        </div>
    </header>
  )
}

export default Navbar