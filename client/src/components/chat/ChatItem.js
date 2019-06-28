import React, { Component } from 'react';
import '../../App.css';

class ChatItem extends Component {
  render() {
    return (
      <div className="chat_row">
        <span className="chat_user">
          {this.props.username}: 
        </span>
        <span className="chat_msg">
          {this.props.message}
        </span>
      </div>
    );
  }
}

export default ChatItem;