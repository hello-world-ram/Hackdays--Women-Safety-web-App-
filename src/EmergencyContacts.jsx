import React, { useState } from "react";

function EmergencyContacts({ setNumbers }) {
  const [phone, setPhone] = useState("");
  const [connectedNumbers, setConnectedNumbers] = useState([]);
  const [loading, setLoading] = useState(false);

  const addNumber = async () => {
    console.log("Button clicked:", phone);

    if (phone.length !== 10) {
      alert("Please enter valid 10 digit number");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/add-number", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone }),
      });

      const data = await res.json();
      console.log("Backend response:", data);

      if (data.success) {
        const fullNumber = `+91${phone}`;
        const updated = [...connectedNumbers, fullNumber];

        setConnectedNumbers(updated);
        setNumbers(updated);
        setPhone("");

        alert("✅ SMS sent successfully");
      } else {
        alert("❌ " + data.message);
      }
    } catch (error) {
      console.log("Error:", error);
      alert("❌ Backend server not working");
    }

    setLoading(false);
  };

  return (
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
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
        />
      </div>

      <button className="connect-btn" onClick={addNumber} disabled={loading}>
        {loading ? "Connecting..." : "+ Add Number"}
      </button>

      <div className="emergency-numbers">
        <p>🚨 Women Helpline: <strong>1091</strong></p>
        <p>🚨 Emergency: <strong>112</strong></p>

        {connectedNumbers.map((num, i) => (
          <p key={i}>✅ {num}</p>
        ))}
      </div>
    </div>
  );
}

export default EmergencyContacts;