import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import '../App.css';
import TetrisBoard from './TetrisBoard';
import TetrisBoardMini from './TetrisBoardMini';
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
      isGameOver: false,
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

  componentWillUnmount() {
    this.state.socket.emit('leave_game', { id: this.state.id });
  }

  startGame = (socket) => {
    socket.emit('start_game', {
      id: this.state.id
    });

    document.addEventListener('keydown', this.onKeyPress);

    socket.on('game_state', data => {
      // console.log(data.gameState);
      // console.log("game state");
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

    let opponents = [];

    try {
      for (let key in this.state.gameState) {
        if (this.state.gameState.hasOwnProperty(key) && key !== this.state.id) {
          opponents.push(this.state.gameState[key]);
        }
      }
    }
    catch (err) {
      console.log(err);
    }

    return (
      <div>
        {
          this.state.gameState ?
            <div id="game">
              <h2>{this.state.gameState[this.state.id].username}</h2>
              <TetrisBoard board={this.state.gameState[this.state.id].board} />
              <div id="side_bar">
                <ScoreBox lines={this.state.gameState[this.state.id].linesRemoved} />
                {
                  opponents.map((opp, i) =>
                    <TetrisBoardMini key={i} board={opp.board} username={opp.username} />
                  )
                }
              </div>
              {
                this.state.isGameOver ?
                <GameOverView /> : <></>
              }
            </div>
            :
            <></>
        }
      </div>
    );
  }
}

export default TetrisGame;