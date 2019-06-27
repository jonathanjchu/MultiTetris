import React, { Component } from 'react';
import '../App.css';
import TetrisBoard from './TetrisBoard';
import GameOverView from './GameOverView';
import ScoreBox from './ScoreBox';
import SocketIOClient from 'socket.io-client';

class TetrisGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      endpoint: "localhost:54810/tetris",
      id: this.props.match.params.id,
      socket: null,
      gameState: null
    };
  }

  componentDidMount() {
    let socket = SocketIOClient(this.state.endpoint);
    this.startGame(socket);
    this.setState({
      socket: socket
    });
  }

  // socketConnect = () => {
  // }

  startGame = (socket) => {
    socket.emit('start_game', {
      id: this.state.id
    });

    document.addEventListener('keydown', this.onKeyPress);

    socket.on('game_state', data => {
      // console.log(data.gameState);
      console.log("game state");
      this.setState({
        gameState: data.gameState,
        isGameOver: false,
      });
    });

    socket.on('game_over', data => {
      this.setState({
        isGameOver: true
      });
    })
  }

  onKeyPress = (e) => {
    this.state.socket.emit('key_press', {
      keyCode: e.keyCode,
      id: this.state.id
    });
  }

  render() {
    return (
      <div>
        {
          this.state.gameState ?
            <TetrisBoard board={this.state.gameState[this.state.id].board} />
            :
            <></>
        }
      </div>
    );
  }
}

export default TetrisGame;