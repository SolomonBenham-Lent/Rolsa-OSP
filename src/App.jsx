import { useState } from 'react'
import './App.css'
import { Routes, Route, Link } from "react-router-dom"
import Home from "./pages/home.jsx"
import Calculator from './pages/calculator.jsx'

function App() {
  return (
    <>
      <nav>
        <Link to="pages/home">Home Link</Link>
        <Link to="/calculator">CO2 Calculator Link</Link>
      </nav>
      
      <Routes>
        <Route path="pages/home" element={<Home/>}/>
        <Route path="/calculator" element={<Calculator/>}/>
      </Routes>
    </>
  )
}

export default App