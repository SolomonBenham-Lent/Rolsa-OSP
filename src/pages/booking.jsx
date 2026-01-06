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
      <button
        className="solarButton"
        id="solar"
        onClick={() => {
          if (!selectSolar) {
            setSelectSolar(true);
            solar.classList.toggle("active");
          } else {
            setSelectSolar(false);
            solar.classList.toggle("active");
          }
        }}
      >
        Solar Panel
      </button>
      <button
        className="evButton"
        id="ev"
        onClick={() => {
          if (!selectEV) {
            setSelectEV(true);
            ev.classList.toggle("active");
          } else {
            setSelectEV(false);
            ev.classList.toggle("active");
          }
        }}
      >
        EV Charging Station
      </button>
      <button
        className="smartHomeButton"
        id="smartHome"
        onClick={() => {
          if (!selectSmartHome) {
            setSelectSmartHome(true);
            smartHome.classList.toggle("active");
          } else {
            setSelectSmartHome(false);
            smartHome.classList.toggle("active");
          }
        }}
      >
        Smart Home Energy Management System
      </button>

      {/* <div>
        {selectSolar && <div>Solar Panel Selected</div>}
        {selectEV && <div>EV Charging Station Selected</div>}
        {selectSmartHome && (
          <div>Smart Home Energy Management System Selected</div>
        )}
      </div> */}
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

function Address({ address, setAddress }) {
  return (
    <input
      className="addressInput"
      type="text"
      placeholder="Address"
      value={address}
      onChange={(e) => setAddress(e.target.value)}
    />
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
  const [address, setAddress] = useState("");
  const [datetime, setDatetime] = useState("");

  return (
    <>
      <div className="bookingContainer">
        <h1>Booking page</h1>
        <br />
        <div className="productContainer">
          <h2 className="productTitle">Select a Product</h2>
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
          <h2 className="infoTitle">Your Information</h2>
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
        <div className="addressContainer">
          <h2 className="addressTitle">Your Address</h2>
          <Address address={address} setAddress={setAddress} />
        </div>
        <br />
        <div className="scheduleContainer">
          <br />
          <h2 className="scheduleTitle">Schedule Consultation</h2>
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
          address={address}
          datetime={datetime}
        />
      </div>
    </>
  );
}

export default Booking;
