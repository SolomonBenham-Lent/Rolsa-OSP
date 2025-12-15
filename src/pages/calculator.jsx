import { useState } from "react";

function Input({ label, placeholder, value, setValue }) {
  return (
    <>
      <label>{label}</label>
      <input
        type="number"
        placeholder={placeholder}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      ></input>
    </>
  );
}

function Calculate({
  miles,
  setMiles,
  elec,
  setElec,
  flights,
  setFlights,
  meals,
  setMeals,
}) {
  if (miles < 0) {
    setMiles(0);
  }
  if (elec < 0) {
    setElec(0);
  }
  if (flights < 0) {
    setFlights(0);
  }
  if (meals < 0) {
    setMeals(0);
  }

  const [totalCO2, setTotalCO2] = useState("");
  const [impact, setImpact] = useState("");

  return (
    <>
      <button
        onClick={() => {
          const m = Number(miles) || 0;
          const e = Number(elec) || 0;
          const f = Number(flights) || 0;
          const mm = Number(meals) || 0;

          const milesCalc = Number((m * 0.4).toFixed(2));
          const elecCalc = Number((e * 0.2).toFixed(2));
          const flightsCalc = Number((f * 110).toFixed(2));
          const mealsCalc = Number((mm * 8.1).toFixed(2));

          setTotalCO2(
            (milesCalc + elecCalc + flightsCalc + mealsCalc).toFixed(2) + " Kg"
          );

          if (milesCalc + elecCalc + flightsCalc + mealsCalc < 500) {
            setImpact("Low Impact");
          } else if (
            milesCalc + elecCalc + flightsCalc + mealsCalc >= 500 &&
            milesCalc + elecCalc + flightsCalc + mealsCalc < 1500
          ) {
            setImpact("Moderate Impact");
          } else {
            setImpact("High Impact");
          }
        }}
      >
        Calculate Total CO2
      </button>
      <div>{totalCO2}</div>
      <div>{impact}</div>
    </>
  );
}

function Calculator() {
  const [miles, setMiles] = useState("");
  const [elec, setElec] = useState("");
  const [flights, setFlights] = useState("");
  const [meals, setMeals] = useState("");

  return (
    <>
      <h1>Calculator Page</h1>

      <Input
        label="Miles Driven Per Month"
        placeholder={"e.g. 500"}
        value={miles}
        setValue={setMiles}
      />
      <br />
      <Input
        label="Electricity Usage (kWh per month)"
        placeholder={"e.g. 900"}
        value={elec}
        setValue={setElec}
      />
      <br />
      <Input
        label="Flights Per Month"
        placeholder={"e.g. 2"}
        value={flights}
        setValue={setFlights}
      />
      <br />
      <Input
        label="Meat-Based Meals Per Month"
        placeholder={"e.g. 60"}
        value={meals}
        setValue={setMeals}
      />
      <br />
      <Calculate
        miles={miles}
        setMiles={setMiles}
        elec={elec}
        setElec={setElec}
        flights={flights}
        setFlights={setFlights}
        meals={meals}
        setMeals={setMeals}
      />
    </>
  );
}

export default Calculator;
