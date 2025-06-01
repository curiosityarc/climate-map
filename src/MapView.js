import { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function MapView() {
  const [geeTileUrl, setGeeTileUrl] = useState(null);

  useEffect(() => {
    // Call your FastAPI backend
    fetch('/api/temperature', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        start_date: '2025-01-01',
        end_date: '2025-01-15',
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setGeeTileUrl(data.tile_url);
      })
      .catch((err) => console.error('Failed to load GEE layer:', err));
  }, []);

  return (
    <MapContainer center={[0, 0]} zoom={2} style={{ height: '100vh', width: '100%' }}>
      {/* 🗺️ Base Layer: ESRI Light Gray */}
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
        attribution="© Esri, HERE, Garmin, FAO, NOAA, USGS"
      />

      {/* 🔥 Overlay: GEE Temperature Layer */}
      {geeTileUrl && (
        <TileLayer
          url={geeTileUrl}
          attribution="Data: Google Earth Engine"
          opacity={0.6}
        />
      )}
    </MapContainer>
  );
}
