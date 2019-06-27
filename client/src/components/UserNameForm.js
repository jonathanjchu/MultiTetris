import React, { Component } from 'react';
import '../App.css';
import SocketIOClient from 'socket.io-client';
// import { Link, Route, BrowserRouter } from 'react-router-dom';

class UserNameForm extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      endpoint: "192.168.1.81:54810/usernames",
      username: "",
      message: ""
    };
  }

  onUserNameChange = (e) => {
    this.setState({
        username: e.target.value
    });
  }

  onUserNameSubmit = (e) => {
      e.preventDefault();

      let socket = SocketIOClient(this.state.endpoint);

      socket.emit('set_username', { username: this.state.username });
  
      socket.on('confirm_username', data => {
          this.setState({
            message: ""
          });
          this.props.history.push(`/tetris/${data.id}`);
      });

      socket.on('username_used', data => {
        this.setState({
          username: "",
          message: "Username already in use"
        });
      });

      // this.props.onUserNameSubmit(this.state.username);
  }

  render() {
    return (
      <div>
        <h3>{this.state.message}</h3>
        <form onSubmit={this.onUserNameSubmit}>
            <label>Enter username: </label>
            <input type="text"
                onChange={this.onUserNameChange}
                value={this.state.username} />
            <input type="submit" value="Enter" />
        </form>
      </div>
    );
  }
}

export default UserNameForm;