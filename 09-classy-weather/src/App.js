import React from 'react';
export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { count: 5 };
    this.handleDec = this.handleDec.bind(this);
    this.handleInc = this.handleInc.bind(this);
  }

  handleDec() {
    this.setState(currState => {
      return { count: currState.count - 1 };
    });
  }

  handleInc() {
    this.setState(currState => {
      return { count: currState.count + 1 };
    });
  }

  render() {
    const date = new Date('june 21 2027');
    date.setDate(date.getDate() + this.state.count);

    return (
      <div>
        <button onClick={this.handleDec}>-</button>
        <span>
          {date.toDateString()} {this.state.count}
        </span>
        <button onClick={this.handleInc}>+</button>
      </div>
    );
  }
}
