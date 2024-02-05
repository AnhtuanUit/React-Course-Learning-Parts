import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Map.module.css';

function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  const navigate = useNavigate();

  return (
    <div className={styles.mapContainer} onClick={() => navigate('form')}>
      <h3>Map</h3>
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
      </button>
    </div>
  );
}

export default Map;
