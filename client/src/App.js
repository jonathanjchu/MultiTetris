import React, { Component } from 'react';
import './App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
// import SocketIOClient from 'socket.io-client';
import TetrisGame from './components/TetrisGame';

import UserNameForm from './components/UserNameForm';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // username: "",
      // gameState: {},

    };
  }

  componentDidMount = () => {
    // this.socketConnect();
  };


  // onUserNameSubmit = (username) => {
  //   this.setState({
  //     username: username
  //   });
  //   // this.startGame();
  //   console.log(username);
  // }

  onKeyPress = (e) => {
    this.state.socket.emit('key_press', { keyCode: e.keyCode });
  }

  render() {
    console.log(this.state.username);
    console.log(this.state.gameState);
    return (
      <div className="App">
        <header className="App-header">
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={UserNameForm} />
              <Route path="/tetris/:id" component={TetrisGame} />
            </Switch>
          </BrowserRouter>
          <h3>{this.state.username}</h3>
          
        </header>
      </div >
    );
  }
}

export default App;

{/* <Route exact path="/" render={(props) => <UserNameForm onUserNameSubmit={this.onUserNameSubmit} />} /> */}
{/* <Route exact path="/:id" render={(props) => <TetrisGame username={this.state.username} />} /> */}