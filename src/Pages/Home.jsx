import React, { useState } from "react";
import SOSButton from "../components/SOSButton";
import LocationCard from "../components/LocationCard";

function Home() {
  const [location, setLocation] = useState(null);
  const [status, setStatus] = useState("System Ready");
  const [aiTip, setAiTip] = useState("");

  const getLocation = () => {
    setStatus("Fetching location...");

    if (!navigator.geolocation) {
      setStatus("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };

        setLocation(coords);
        setStatus("Location fetched successfully");
      },
      () => {
        setStatus("Location permission denied");
      }
    );
  };

  const handleSOS = () => {
    setStatus("Sending SOS...");

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const coords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };

        setLocation(coords);

        try {
          const res = await fetch("http://localhost:8000/sos", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ location: coords }),
          });

          const data = await res.json();
          setStatus(data.message || "🚨 SOS Sent Successfully!");
        } catch (error) {
          setStatus("SOS sending failed");
        }
      },
      () => {
        setStatus("Location permission required for SOS");
      }
    );
  };

  const getAISafetyTips = async () => {
    setStatus("Getting AI safety tips...");
    setAiTip("");

    try {
      const res = await fetch("http://localhost:8000/ai-safety", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: "I am travelling alone and I feel unsafe. Give quick women safety tips.",
          location,
        }),
      });

      const data = await res.json();
      setAiTip(data.reply || "No AI response received");
      setStatus("AI safety tips ready");
    } catch (error) {
      setStatus("AI safety tips failed");
    }
  };

  return (
    <div className="dashboard">
      <nav className="navbar">
        <h2>🛡 Women Safety Dashboard</h2>
        <span>{status}</span>
      </nav>

      <section className="hero">
        <div className="left-panel">
          <h1>
            Your Safety,
            <br />
            Our Priority
          </h1>

          <p>
            Smart emergency support with live location, quick SOS alert and AI
            safety guidance.
          </p>

          <LocationCard location={location} getLocation={getLocation} />

          {location && (
            <a
              className="map-link"
              href={`https://www.google.com/maps?q=${location.lat},${location.lng}`}
              target="_blank"
              rel="noreferrer"
            >
              📍 Open Live Location in Google Maps
            </a>
          )}
        </div>

        <div className="center-panel">
          <SOSButton handleSOS={handleSOS} />

          <button className="ai-btn" onClick={getAISafetyTips}>
            🤖 Get AI Safety Tips
          </button>
        </div>

        <div className="right-panel">
          <div className="info-card">
            <h3>⚡ Safety Actions</h3>
            <p>✔ Share live location</p>
            <p>✔ Use SOS in emergency</p>
            <p>✔ Stay in public area</p>
            <p>✔ Call trusted contact</p>
          </div>
<div className="info-card emergency-contact-card">
  <h3>📞 Connect Family Members</h3>

  <label className="contact-label">Enter Mobile Number</label>

  <div className="phone-wrapper">
    <div className="country-code">+91</div>

    <input
      type="tel"
      placeholder="Enter 10 digit number"
      maxLength="10"
      className="phone-input"
    />
  </div>

  <button className="connect-btn">
    + Add Number
  </button>

  <div className="emergency-numbers">
    <p>🚨 Women Helpline: <strong>1091</strong></p>
    <p>🚨 Emergency: <strong>112</strong></p>
  </div>
</div>
          {aiTip && (
            <div className="info-card ai-card">
              <h3>🤖 Gemini AI Advice</h3>
              <p>{aiTip}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;