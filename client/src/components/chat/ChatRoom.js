import React, { Component } from 'react';
import '../../App.css';
import SocketIOClient from 'socket.io-client';
import ChatForm from './ChatForm';
import ChatItem from './ChatItem';

class ChatRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      endpoint: "192.168.1.81:54810/chat",
      socket: null,
      messages: [],
      username: this.props.username
    };
  }

  componentDidMount() {
    let socket = SocketIOClient(this.state.endpoint);

    socket.on('get_all_messages', data => {
      console.log("all: " + data.messages);
      this.setState({
        messages: data.messages
      });
    });

    socket.on('receive_new_message', data => {
      let messages = [...this.state.messages];

      messages.push({
        username: data.username,
        message: data.message,
        timestamp: data.timestamp
      });


      this.setState({
        messages: messages
      });
    });

    this.setState({
      socket: socket
    });
  }

  onNewMessage = (msg) => {
    this.state.socket.emit('send_new_message', {
      username: this.state.username,
      message: msg
    });

    let messages = [...this.state.messages];
    messages.push({
      username: this.state.username,
      message: msg,
      timestamp: Date.now(),
    });

    this.setState({
      messages: messages
    });
  }

  render() {
    return (
      <>
        <div id="chatroom">
          {
            this.state.messages.map((msg, i) => 
              <ChatItem username={msg.username} message={msg.message} key={i} />
            )
          }
        </div>
        <ChatForm onNewMessage={this.onNewMessage} />
      </>
    );
  }
}

export default ChatRoom;