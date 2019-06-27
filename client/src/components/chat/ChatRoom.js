import React, { Component } from 'react';
import '../../App.css';
import SocketIOClient from 'socket.io-client';
import ChatForm from './ChatForm';

class ChatRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      endpoint: "192.168.1.81:54810/chat",
      socket: null,
      messages: []
    };
  }

  componentDidMount() {
    let socket = SocketIOClient(this.state.endpoint);

    socket.on('get_all_messages', data => {
      console.log(data.messages);
      this.setState({
        messages: data.messages
      });
    });

    this.setState({
      socket: socket
    });
  }

  onNewMessage = (msg) => {
    this.state.socket.emit('send_new_message', {
      message: msg
    });
  }

  render() {
    return (
      <>
        <div id="chatroom">
          {
            this.state.messages.map((msg, i) => 
              <div className="message" key={i}>{msg}</div>
            )
          }
        </div>
        <ChatForm onNewMessage={this.onNewMessage} />
      </>
    );
  }
}

export default ChatRoom;