import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { location: 'vietnam' };
    this.fetchWeather = this.fetchWeather.bind(this);
  }

  fetchWeather() {
    console.log('Loading weather...');
  }

  render() {
    return (
      <div className="app">
        <h1>Classy Weather</h1>
        <div>
          <input
            type="text"
            placeholder="Search from location..."
            value={this.state.location}
            onChange={e => this.setState({ location: e.target.value })}
          />
        </div>
        <button onClick={this.fetchWeather}>Get weather</button>
      </div>
    );
  }
}
