import CountryItem from './CountryItem';
import styles from './CountryList.module.css';
import Message from './Message';
import Spinner from './Spinner';

function CountryList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;
  if (!cities.length) {
    return (
      <Message message="Add your first country by clicking on a country on the map" />
    );
  }

  const countries = cities
    .filter(
      (city, index, arr) =>
        arr.findIndex(c => c.country === city.country) === index
    )
    .map(city => ({ emoji: city.emoji, country: city.country }));

  return (
    <ul className={styles.countryList}>
      {countries.map(country => (
        <CountryItem key={country.country} country={country} />
      ))}
    </ul>
  );
}

export default CountryList;
