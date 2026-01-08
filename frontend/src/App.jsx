import { useState } from 'react'
import './App.css'
import { Routes, Route, Link } from "react-router-dom"
import Home from "./pages/home.jsx"
import Calculator from "./pages/calculator.jsx"
import Navbar from "./components/Navbar/Navbar.jsx"
import Footerbar from "./components/Footer/Footerbar.jsx"
import background_shape_1 from "./assets/green_semi_circle.svg"
import semi_circle from "./assets/semi_circle.svg"

const App = () => {
  return (
    <div>
      <Navbar/>
      <img src={background_shape_1} alt="background" className="background_image"/>
      
      <img src={semi_circle} alt="semi circle background" className="background_semi_circle"/>
      <Footerbar/>
    </div>
  )
}

export default App