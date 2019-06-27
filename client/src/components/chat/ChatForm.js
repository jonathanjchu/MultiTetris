import React, { Component } from 'react';
import '../../App.css';

class ChatForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ""
    };
  }

  submitMessage = (e) => {
    e.preventDefault();

    if (this.state.message.length > 0) {
      this.props.onNewMessage(this.state.message);
      this.setState({ message: "" });
    }
  }

  onMessageChange = (e) => {
    this.setState({ message: e.target.value });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submitMessage}>
          <input type="text"
            onChange={this.onMessageChange}
            value={this.state.message} />
          <input type="submit" value="Send" />
        </form>
      </div>
    );
  }
}

export default ChatForm;