import { use } from "react";
import { useState } from "react";
import { useEffect } from "react";

function Profile() {
  const [readOnly, setReadOnly] = useState(true);
  const [fullNameState, setFullNameState] = useState("");
  // 1. Create a "bucket" to hold our users. Starts empty array [].
  const [users, setUsers] = useState([]);

  // 2. This runs automatically when the component "mounts" (loads)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users"); // Call the Flask waiter
        const data = await response.json(); // Unwrap the JSON package
        setUsers(data); // Put the data into our bucket (state)

        if (data.length > 0) {
          setFullNameState(data[0].fullName); // Set full name from the first user
          console.log(data[0].fullName);
        }

        console.log(data); // Optional: log it to see if it worked
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // The empty [] ensures this runs only once

  const email = "johnDoe@email.com";
  const phone = "123-456-7890";

  console.log(users);

  console.log(users.fullName);
  const [emailState, setEmailState] = useState(email);
  const [phoneState, setPhoneState] = useState(phone);

  function updateDB(newName) {
    // Placeholder for updating the database
  }

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
        value={emailState}
        onChange={(e) => setEmailState(e.target.value)}
        readOnly={readOnly}
      />
      <br />
      <input
        type="text"
        id="userInfo"
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
