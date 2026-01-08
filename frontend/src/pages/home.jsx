
import Card_Deck from '../components/Card_Deck/Card_Deck.jsx';
import Stat_Circle from '../components/Stat_Circle/Stat_Circle.jsx';
import "../pages/home.css"

function Home() {
  return (
    <>
      <h1>Rolsa Technology</h1>
      <Stat_Circle/>
      <h2>Who are we?</h2>
      <Card_Deck className = "home-card-deck"/>
    </>
  );
}

export default Home;
