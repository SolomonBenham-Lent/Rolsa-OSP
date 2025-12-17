import React from 'react';
import './Card_Deck.css';
import solar_panel_green from '../../assets/solar_panel_green.svg';
import green_car from '../../assets/green_car.svg';
import green_house from '../../assets/green_house.svg';


function Card() {
  return (
    <>
      <div className="card_container">

        <div className="card_section">

          <div className="top_card_1">
            <img src={solar_panel_green} alt="solar_panel_green" className="solar_panel_green"/>
          </div>

          <div className="card_desc">Card deck 1</div>

        </div>

        <div className="card_section">
          <div className="top_card_2">
            <img src={green_car} alt="green_car" className="green_car"/>
          </div>
          <div className="card_desc">Card deck 2</div>
        </div>

        <div className="card_section">
          <div className="top_card_3">
            <img src={green_house} alt="green_house" className="green_house"/>
          </div>
          <div className="card_desc">Card deck 3</div>
        </div>

      </div>
    </>
  );
}

export default Card;
