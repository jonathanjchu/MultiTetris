import React, { Component } from 'react';
import '../../App.css';

class ChatItem extends Component {
  render() {

    let chatClassName = "chat_row";

    if (this.props.isMyUsername) {
      chatClassName += " chat_highlight";
    }

    return (
      <div className={chatClassName}>
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