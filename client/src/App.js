import React, { Component } from 'react';
import './App.css';
import {  Route, Switch, BrowserRouter } from 'react-router-dom';
// import SocketIOClient from 'socket.io-client';
import TetrisGame from './components/tetris/TetrisGame';
import Lobby from './components/lobby/Lobby';
import UserNameForm from './components/lobby/UserNameForm';

class App extends Component {
  onKeyPress = (e) => {
    this.state.socket.emit('key_press', { keyCode: e.keyCode });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={UserNameForm} />
              <Route path="/lobby/:id" component={Lobby} />
              <Route path="/tetris/:id" component={TetrisGame} />
            </Switch>
          </BrowserRouter>
          
        </header>
      </div >
    );
  }
}

export default App;
