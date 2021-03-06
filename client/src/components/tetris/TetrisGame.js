import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import SocketIOClient from 'socket.io-client';
import TetrisBoard from './TetrisBoard';
import TetrisBoardMini from './TetrisBoardMini';
import GameOverView from './GameOverView';
import ScoreBox from './ScoreBox';
import NextPiece from './NextPiece';
import ChatRoom from '../chat/ChatRoom';

class TetrisGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // endpoint: "192.168.1.81:54810/tetris",
      // endpoint: "18.222.83.43:54810/tetris",
      // endpoint: "192.168.1.164:54810/tetris",
      endpoint: "localhost:54810/tetris",
      id: this.props.match.params.id,
      socket: null,

      isGameOver: false,
      gameState: null,

      messages: [],

      colorKey: [
        "blank",
        "blue",
        "purple",
        "green",
        "orange",
        "red",
        "yellow",
        "gray"
      ]
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
    this.state.socket.off();
    this.state.socket.disconnect();
  }

  startGame = (socket) => {
    socket.emit('confirm_in_game', {
      id: this.state.id
    });

    document.addEventListener('keydown', this.onKeyPress);

    socket.on('game_state', data => {
      this.setState({
        gameState: data.gameState,
        isGameOver: false,
      });
    });

    socket.on('game_over', data => {
      this.setState({
        isGameOver: true
      });
      document.removeEventListener('keydown', this.onKeyPress);
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
        <Link to="/" className="nav">Quit</Link>
        {
          this.state.gameState ?
            <div id="game">
              <h2>{this.state.gameState[this.state.id].username}</h2>
              <div id="left_bar">
                <div id="chat_bar">
                  <ChatRoom username={this.state.gameState[this.state.id].username} />
                </div>
                <div id="instructions">
                  <p><b><u>How to play</u></b></p>
                  <p><b>Rotate:</b> Up</p>
                  <p><b>Move:</b> Left, Right, Down</p>
                  <p><b>Drop:</b> Space</p>
                  <br />
                  <p>Clearing 2 or more lines will give junk lines to your opponents</p>
                </div>
              </div>
              <TetrisBoard board={this.state.gameState[this.state.id].board} colorKey={this.state.colorKey} />
              <div id="right_bar">
                <NextPiece shape={this.state.gameState[this.state.id].nextShape} colorKey={this.state.colorKey} />
                <ScoreBox lines={this.state.gameState[this.state.id].linesRemoved} />
                {
                  opponents.map((opp, i) =>
                    <TetrisBoardMini key={i} board={opp.board} username={opp.username} colorKey={this.state.colorKey} />
                  )
                }
              </div>
              {
                this.state.isGameOver ?
                  <GameOverView /> : <></>
              }
            </div>
            :
            <h1>
              Loading...
            </h1>
        }
      </div>
    );
  }
}

export default TetrisGame;