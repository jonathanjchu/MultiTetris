import React, { Component } from 'react';
import '../../App.css';
import SocketIOClient from 'socket.io-client';
// import { Link, Route, BrowserRouter } from 'react-router-dom';

class UserNameForm extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      endpoint: "192.168.1.81:54810/usernames",
      // endpoint: "192.168.1.164:54810/usernames",
      // endpoint: "localhost:54810/usernames",
      username: "",
      message: "",
      canSubmit: false,
      socket: null
    };
  }

  componentWillUnmount() {
    this.state.socket.off();
    this.state.socket.disconnect();
  }

  onUserNameChange = (e) => {
    let canSubmit = this.state.canSubmit;
    let message = "";

    if (e.target.value.length > 0 && e.target.value.length < 16) {
      canSubmit = true;
      message = "";
    }
    else {
      message = "Username must be less than 16 characters";
    }

    this.setState({
        username: e.target.value,
        canSubmit: canSubmit,
        message: message
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
          this.props.history.push(`/lobby/${data.id}`);
      });

      socket.on('username_used', data => {
        this.setState({
          username: "",
          message: "Username already in use"
        });
      });

      socket.on('user_too_late', data => {
        this.setState({
          message: "Game already started"
        });
      });

      this.setState({
        socket: socket
      });
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
            <input type="submit" value="Enter" disabled={!this.state.canSubmit} />
        </form>
      </div>
    );
  }
}

export default UserNameForm;