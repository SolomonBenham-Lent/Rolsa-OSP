import { useEffect, useState } from "react";

function GoogleLogin() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (document.getElementById("google-client-script")) return;

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.id = "google-client-script";
    document.body.appendChild(script);

    script.onload = () => {
      if (window.google && window.google.accounts) {
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse,
        });

        window.google.accounts.id.renderButton(
          document.getElementById("google-signin-button"),
          {
            theme: "outline",
            size: "large",
            text: "sign_in_with",
            width: 367,
          }
        );
      }
    };
  }, []);

  const handleCredentialResponse = async (response) => {
    try {
      const result = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: response.credential }),
      });

      const userData = await result.json();
      setUser(userData);
      localStorage.setItem("token", userData.token);
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem("token");
    if (window.google && window.google.accounts) {
      window.google.accounts.id.disableAutoSelect();
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.name}</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <div id="google-signin-button"></div>
      )}
    </div>
  );
}

export default GoogleLogin;