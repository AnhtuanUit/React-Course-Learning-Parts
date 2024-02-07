import { Link } from 'react-router-dom';
import styles from './CityItem.module.css';
import { useCities } from '@src/contexts/CitiesContext';

const formatDate = date =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));

function CityItem({ city }) {
  const { deleteCity } = useCities();
  const {
    cityName,
    emoji,
    date,
    id,
    position: { lat, lng },
  } = city;

  function handleDeleteCity(e) {
    e.preventDefault();
    deleteCity(id);
  }

  return (
    <li>
      <Link to={`${id}?lat=${lat}&lng=${lng}`} className={styles.cityItem}>
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={handleDeleteCity}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
