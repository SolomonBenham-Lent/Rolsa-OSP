import { useState } from 'react'
import './App.css'
import { Routes, Route, Link } from "react-router-dom"
import Home from "./pages/home.jsx"
import Calculator from './pages/calculator.jsx'
import Navbar from "./components/Navbar/Navbar.jsx"


const App = () => {
  return (
      <Navbar/>
  )
}

export default App