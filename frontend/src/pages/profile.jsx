import { use } from "react";
import { useState } from "react";
import { useEffect } from "react";

function Profile() {
  const [readOnly, setReadOnly] = useState(true);
  const [fullNameState, setFullNameState] = useState("");
  const [emailState, setEmailState] = useState("");
  const [phoneState, setPhoneState] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users");
        const data = await response.json();
        setUsers(data);
        if (data.length > 0) {
          setFullNameState(data[0].fullName);
          setEmailState(data[0].email);
          setPhoneState(data[0].phone);
          console.log(data[0].fullName);
        }

        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <h1>Profile Page</h1>

      <input
        type="text"
        id="userInfo"
        value={fullNameState}
        onChange={(e) => setFullNameState(e.target.value)}
        readOnly={readOnly}
      />
      <br />
      <input
        type="text"
        id="userInfo"
        placeholder="No e-mail"
        value={emailState}
        onChange={(e) => setEmailState(e.target.value)}
        readOnly={readOnly}
      />
      <br />
      <input
        type="text"
        id="userInfo"
        placeholder="No Phone Number"
        value={phoneState}
        onChange={(e) => setPhoneState(e.target.value)}
        readOnly={readOnly}
      />
      <br />
      <button
        onClick={() => {
          setReadOnly(false);
          console.log("Edit button clicked" + { readOnly });
        }}
        visable={readOnly ? "true" : "false"}
      >
        <br />
        Edit Profile
      </button>
      <br />
      <button
        onClick={() => {
          setReadOnly(true);
          console.log("Save button clicked" + { readOnly });
          updateDB(fullNameState);
        }}
        visable={readOnly ? "false" : "true"}
      >
        Save Profile
      </button>
    </>
  );
}

export default Profile;
