import React, { Component } from 'react';
import '../../App.css';
import SocketIOClient from 'socket.io-client';
import ChatForm from './ChatForm';
import ChatItem from './ChatItem';

class ChatRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // endpoint: "192.168.1.81:54810/chat",
      // endpoint: "localhost:54810/chat",
      endpoint: "18.222.83.43:54810/chat",
      socket: null,
      messages: [],
      username: this.props.username
    };
  }

  componentDidMount() {
    let socket = SocketIOClient(this.state.endpoint);

    socket.on('get_all_messages', data => {
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

  componentWillUnmount() {
    this.state.socket.off();
    this.state.socket.disconnect();
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
            <>
            {
              msg.username === this.state.username ?
              <ChatItem key={i} username={msg.username} message={msg.message} isMyUsername={true} />
              :
              <ChatItem key={i} username={msg.username} message={msg.message} isMyUsername={false} />
            }
            </>
            )
          }
        </div>
        <ChatForm onNewMessage={this.onNewMessage} />
      </>
    );
  }
}

export default ChatRoom;