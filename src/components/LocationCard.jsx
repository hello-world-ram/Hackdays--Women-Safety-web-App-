export default function LocationCard({ location, setLocation }) {

  const openMapDirect = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        // Save location
        setLocation({ lat, lng });

        // Open Google Maps
        const url = `https://www.google.com/maps?q=${lat},${lng}`;
        window.open(url, "https://www.google.com/maps/@23.320396,77.8000883,12.83z?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D");
      },
      () => {
        alert("Please allow location access");
      }
    );
  };

  return (
    <div className="location-card">
      <h3>📍 Live MAP</h3>

      {location ? (
        <div className="location-data">
          <p><strong>Latitude:</strong> {location.lat}</p>
          <p><strong>Longitude:</strong> {location.lng}</p>
        </div>
      ) : (
        <p className="muted">No location fetched</p>
      )}

      {/* Single Button */}
      <button className="map-btn" onClick={openMapDirect}>
        🌍 Open Live Location
      </button>
    </div>
  );
}