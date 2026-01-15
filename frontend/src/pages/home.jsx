
import Card_Deck from '../components/Card_Deck/Card_Deck.jsx';
import Stat_Circle from '../components/Stat_Circle/Stat_Circle.jsx';
import "../pages/home.css"

function Home() {
  return (
    <>
      <h1 className="home_h1">Rolsa Technology</h1>
      <Stat_Circle/>

      <div className="info_container">
        <h2 className="home_h2">Who are we?</h2>

        <div className="paragraph_container">
          <p>Rolsa Technology is a bright, eco‑friendly company
          that helps people make greener choices by offering
          easy bookings <br/> for solar panel installations, EV
          charging stations, and smart home energy systems.</p>
        </div>
        
      </div>
      
      <Card_Deck className = "home-card-deck"/>


    </>
  );
}

export default Home;
