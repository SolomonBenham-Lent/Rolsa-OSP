import { useState } from 'react'
import './App.css'
import { Routes, Route, Link } from "react-router-dom"
import Home from "./home.jsx"

function App() {
  return (
    <>
      <nav>
        <Link to="/homeTest">home link</Link>
      </nav>
      
      <Routes>
        <Route path="/homeTest" element={<Home/>}/>
      </Routes>
    </>
  )
}

export default App