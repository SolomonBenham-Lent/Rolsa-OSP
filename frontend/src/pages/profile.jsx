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
        const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

        if (currentUser) {
          console.log("Current User:", currentUser);
          setFullNameState(currentUser.fullName || "");
          setEmailState(currentUser.email || "");
          setPhoneState(currentUser.phone || "");
          setUsers(currentUser);
        }
      } catch (error) {
        console.error("Error parsing currentUser from sessionStorage:", error);
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
