import React, { Component } from 'react';
import '../App.css';
import ChatRoom from './chat/ChatRoom';

class Lobby extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
        // endpoint: "192.168.1.81:54810/lobby",
        endpoint: "localhost:54810/lobby",
        socket: null,
        users: [],
        countDown: 5,
        isStarting: false,
        countDownTimer: null
    };
  }

  componentWillMount() {
    
  }

  render() {
    return (
      <div>
        <ChatRoom />
        <h3>Lobby</h3>
        <h3>Players</h3>
        {
          this.state.users.map((u, i) =>
            <div key={i}>{u}</div>
          )
        }
      </div>
    );
  }
}

export default Lobby;