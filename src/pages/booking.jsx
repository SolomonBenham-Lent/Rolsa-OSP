import { useState } from "react";
import "../style/booking.css";

function SelectProduct({
  selectSolar,
  setSelectSolar,
  selectEV,
  setSelectEV,
  selectSmartHome,
  setSelectSmartHome,
}) {
  return (
    <>
      <div>Select Product</div>
      <button
        className="solarButton"
        onClick={() => {
          if (selectSolar == false) {
            setSelectSolar(true);
          } else {
            setSelectSolar(false);
          }
        }}
      >
        Solar Panel
      </button>
      <button
        className="evButton"
        onClick={() => {
          if (selectEV == false) {
            setSelectEV(true);
          } else {
            setSelectEV(false);
          }
        }}
      >
        EV Charging Station
      </button>
      <button
        className="smartHomeButton"
        onClick={() => {
          if (selectSmartHome == false) {
            setSelectSmartHome(true);
          } else {
            setSelectSmartHome(false);
          }
        }}
      >
        Smart Home Energy Management System
      </button>

      <div>
        {selectSolar && <div>Solar Panel Selected</div>}
        {selectEV && <div>EV Charging Station Selected</div>}
        {selectSmartHome && (
          <div>Smart Home Energy Management System Selected</div>
        )}
      </div>
    </>
  );
}

function Information({ name, setName, email, setEmail, phone, setPhone }) {
  return (
    <>
      <input
        className="nameInput"
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="emailInput"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="phoneInput"
        type="tel"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
    </>
  );
}

function Schedule({ datetime, setDatetime }) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowString = tomorrow.toISOString().slice(0, 16);
  return (
    <>
      <input
        className="dateInput"
        type="datetime-local"
        value={datetime}
        min={tomorrowString}
        onChange={(e) => setDatetime(e.target.value)}
      />
    </>
  );
}

function Book({
  selectSolar,
  selectEV,
  selectSmartHome,
  name,
  email,
  phone,
  datetime,
}) {
  return (
    <>
      <button
        className="bookButton"
        onClick={() => {
          if (
            selectSolar == true ||
            selectEV == true ||
            selectSmartHome == true
          ) {
            if (name && email && phone) {
              if (datetime) {
                alert("Consultation booked successfully!");
              } else {
                alert("Please select a date and time.");
              }
            } else {
              alert("Please fill in all your information.");
            }
          } else {
            alert("Please select a product.");
          }
        }}
      >
        Book Consultation
      </button>
    </>
  );
}

function Booking() {
  const [selectSolar, setSelectSolar] = useState(false);
  const [selectEV, setSelectEV] = useState(false);
  const [selectSmartHome, setSelectSmartHome] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [datetime, setDatetime] = useState("");

  return (
    <>
      <div className="bookingContainer">
        <h1>Booking page</h1>
        <br />
        <div className="productContainer">
          {/* <h2>Select a Product</h2> */}
          <SelectProduct
            selectSolar={selectSolar}
            setSelectSolar={setSelectSolar}
            selectEV={selectEV}
            setSelectEV={setSelectEV}
            selectSmartHome={selectSmartHome}
            setSelectSmartHome={setSelectSmartHome}
          />
        </div>
        <br />
        <div className="infoContainer">
          <h2>Your Information</h2>
          <Information
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
          />
        </div>
        <br />
        <div className="scheduleContainer">
          <h2>Schedule Consultation</h2>
          <Schedule datetime={datetime} setDatetime={setDatetime} />
        </div>
        <br />
        <Book
          selectSolar={selectSolar}
          selectEV={selectEV}
          selectSmartHome={selectSmartHome}
          name={name}
          email={email}
          phone={phone}
          datetime={datetime}
        />
      </div>
    </>
  );
}

export default Booking;
