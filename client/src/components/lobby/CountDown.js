import React, { Component } from 'react';
import '../../App.css';

class CountDown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timeRemaining: this.props.startTime,
      timer: null,
    };
  }

  componentDidMount() {
    this.setState({
      timer: setInterval(this.updateTime, 1000)
    });
  }

  updateTime = () => {
    let timeRemaining = this.state.timeRemaining;
    timeRemaining--;

    if (timeRemaining === 0) {
      clearInterval(this.state.timer);
      this.props.onCountDownFinish();
    }

    this.setState({ timeRemaining: timeRemaining });
  }

  render() {

    return (
      <div className="countdown">
        <h1>
          Starting in {this.state.timeRemaining}
          </h1>
      </div>
    );
  }
}

export default CountDown;