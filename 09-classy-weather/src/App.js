import React from 'react';

function getWeatherIcon(wmoCode) {
  const icons = new Map([
    [[0], '☀️'],
    [[1], '🌤'],
    [[2], '⛅️'],
    [[3], '☁️'],
    [[45, 48], '🌫'],
    [[51, 56, 61, 66, 80], '🌦'],
    [[53, 55, 63, 65, 57, 67, 81, 82], '🌧'],
    [[71, 73, 75, 77, 85, 86], '🌨'],
    [[95], '🌩'],
    [[96, 99], '⛈'],
  ]);
  const arr = [...icons.keys()].find(key => key.includes(wmoCode));
  if (!arr) return 'NOT FOUND';
  return icons.get(arr);
}

function convertToFlag(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function formatDay(dateStr) {
  return new Intl.DateTimeFormat('en', {
    weekday: 'short',
  }).format(new Date(dateStr));
}

export default class App extends React.Component {
  state = {
    location: 'Ho Chi Minh',
    isLoading: false,
    weather: {},
    displayLocation: '',
  };
  timer = null;

  setLocation = e => this.setState({ location: e.target.value });

  fetchWeather = async () => {
    if (this.state.location.length < 2) return this.setState({ weather: {} });

    this.setState({ isLoading: true, weather: {} });
    try {
      // 1) Getting location (geocoding)
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${this.state.location}`
      );
      const geoData = await geoRes.json();
      console.log(geoData);

      if (!geoData.results) throw new Error('Location not found');

      const { latitude, longitude, timezone, name, country_code } =
        geoData.results.at(0);

      console.log(`${name} ${convertToFlag(country_code)}`);
      this.setState({
        displayLocation: `${name} ${convertToFlag(country_code)}`,
      });

      // 2) Getting actual weather
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}${
          timezone ? `&timezone=${timezone}` : ''
        }&daily=weathercode,temperature_2m_max,temperature_2m_min`
      );
      const weatherData = await weatherRes.json();
      console.log(weatherData.daily);
      this.setState({ weather: weatherData.daily });
    } catch (err) {
      console.error(err);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  // useEffect []
  componentDidMount() {
    this.setState({ location: localStorage.getItem('location') || '' });
  }

  // useEffect [location]
  componentDidUpdate(preProps, preState) {
    if (preState.location !== this.state.location) {
      this.timer && clearTimeout(this.timer);
      this.timer = setTimeout(() => this.fetchWeather(), 500);

      localStorage.setItem('location', this.state.location);
    }
  }

  render() {
    return (
      <div className="app">
        <h1>Classy Weather</h1>
        <Input
          onChangeLocation={this.setLocation}
          location={this.state.location}
        />

        {this.state.weather.weathercode && (
          <Weather
            displayLocation={this.state.displayLocation}
            weather={this.state.weather}
          />
        )}
        {this.state.isLoading && <p className="loader">Loading...</p>}
      </div>
    );
  }
}

class Input extends React.Component {
  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Search from location..."
          value={this.props.location}
          onChange={this.props.onChangeLocation}
        />
      </div>
    );
  }
}

class Weather extends React.Component {
  componentWillUnmount() {
    console.log('Weather will unmount');
  }
  render() {
    const { time, weathercode, temperature_2m_min, temperature_2m_max } =
      this.props.weather;

    return (
      <div>
        <h2>{this.props.displayLocation}</h2>
        <ul className="weather">
          {time.map((date, i) => (
            <Day
              key={date}
              date={date}
              code={weathercode[i]}
              min={temperature_2m_min[i]}
              max={temperature_2m_max[i]}
              isToday={i === 0}
            />
          ))}
        </ul>
      </div>
    );
  }
}

class Day extends React.Component {
  render() {
    const { date, code, min, max, isToday } = this.props;
    return (
      <li className="day">
        <span>{getWeatherIcon(code)}</span>
        <p>{isToday ? 'Today' : formatDay(date)}</p>
        <p>
          {Math.floor(min)}&deg; &mdash; <strong>{Math.floor(max)}&deg;</strong>
        </p>
      </li>
    );
  }
}
