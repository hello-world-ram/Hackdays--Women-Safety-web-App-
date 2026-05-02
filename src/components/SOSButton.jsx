export default function SOSButton({ handleSOS }) {
  return (
    <button className="sos-btn" onClick={handleSOS}>
      <span className="sos-icon">🚨</span>
      <span>SOS</span>
    </button>
  );
}