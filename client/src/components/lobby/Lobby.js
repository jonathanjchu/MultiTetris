import React, { Component } from 'react';
import '../../App.css';
import SocketIOClient from 'socket.io-client';
import { withRouter } from 'react-router-dom';
import ChatRoom from '../chat/ChatRoom';
import UserItem from './UserItem';
import CountDown from './CountDown';

class Lobby extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // endpoint: "192.168.1.81:54810/lobby",
      endpoint: "172.31.39.165:54810/lobby",
      // endpoint: "192.168.1.164:54810/lobby",
      // endpoint: "localhost:54810/lobby",
      socket: null,
      id: this.props.match.params.id,
      username: "",
      users: [],
      countDown: 5,
      isStarting: false,
      countDownTimer: null,

      canSetReady: true,
    };
  }

  componentWillMount() {
    let socket = SocketIOClient(this.state.endpoint);
    socket.emit('joining_lobby', { id: this.state.id })

    socket.on('confirm_join', data => {

      console.log(data.username);
      console.log(data.allUsers);

      this.setState({
        username: data.username,
        users: data.allUsers
      });
    })

    socket.on('player_joined', data => {
      let users = [...this.state.users];

      users.push({
        username: data.newuser,
        ready: false
      });

      this.setState({
        users: users
      });
    });

    socket.on('player_left', data => {
      let users = [...this.state.users].filter(x => x !== data.quitter);

      console.log('player_left:' + users);

      this.setState({
        users: users
      });
    });

    socket.on('player_ready', data => {
      this.findUserAndSetToReady(data.username);
    });

    this.setState({
      socket: socket
    });

    socket.on('lobby_countdown', data => {
      this.setState({
        isStarting: true,
        countDown: data.countDown
      });
    });
  }

  componentWillUnmount() {
    this.state.socket.off();
    this.state.socket.disconnect();
  }

  findUserAndSetToReady = (username) => {
    let users = [...this.state.users];

    for (let i = 0; i < users.length; i++) {

      if (users[i].username === username) {
        users[i].isReady = true;
      }
    }
    this.setState({ users: users });
  }

  countDownFinish = () => {
    this.props.history.push(`/tetris/${this.state.id}`);
  }

  setReady = () => {
    this.state.socket.emit('player_set_ready', {
      username: this.state.username,
      id: this.state.id,
      ready: true
    });

    this.findUserAndSetToReady(this.state.username);

    this.setState({
      canSetReady: false,
    });
  }

  render() {
    return (
      <div id="game">
        <h2>Tetris</h2>
        <div id="left_bar">
          <div id="chat_bar">
            {
              this.state.username !== "" ?
                <ChatRoom username={this.state.username} />
                :
                <p>Loading...</p>
            }
          </div>
        </div>
        <div id="right_bar">
          <h3>Players</h3>
          {
            this.state.users.map((u, i) =>
              <UserItem key={i} username={u.username}
                id={u.id}
                isReady={u.isReady}
                isUser={u.username === this.state.username}
                onSetReady={this.setReady}
              />
            )
          }
          <p id="instructions">Press "Ready?" when ready to play</p>
        </div>
        {
          this.state.isStarting ?
            <CountDown startTime={this.state.countDown} onCountDownFinish={this.countDownFinish} />
            :
            <></>
        }
      </div>
    );
  }
}

export default withRouter(Lobby);