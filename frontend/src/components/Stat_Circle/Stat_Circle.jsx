import React from "react"
import "./Stat_Circle.css"
import Stat_Circle_svg from "../../assets/stat_circle.svg"

export default function Stat_Circle({className}){
  return (
    <>
    <div className="stat_circle_container">
      <div className={`circle_selection ${className || ''}`}>
          <img src={Stat_Circle_svg} alt="stat_circle_svg" className="stat_circle_svg"/>
      </div>
    </div>


    </>
  );
}

