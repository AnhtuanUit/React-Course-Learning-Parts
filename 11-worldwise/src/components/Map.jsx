import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Map.module.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useCities } from '@src/contexts/CitiesContext';

const position = [51.505, -0.09];

function Map() {
  const [searchParams] = useSearchParams();
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  const mapPosition = lat && lng ? [lat, lng] : position;
  const { cities } = useCities();
  const navigate = useNavigate();

  return (
    <div className={styles.mapContainer} onClick={() => navigate('form')}>
      {/* <h3>Map</h3>
      <p>Position</p>
      <p>
        <span>Latitude:</span>
        {lat}
      </p>
      <p>
        <span>Longityde:</span>
        {lng}
      </p>
      <button onClick={() => setSearchParams({ lat: 23, lng: 50 })}>
        Change position
      </button> */}
      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map(city => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;
