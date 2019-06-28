import React, { Component } from 'react';
import '../../App.css';

class UserItem extends Component {
  // constructor(props) {
  //   super(props);
  // }

  toggleReady = (e) => {
    e.preventDefault();
    this.props.onSetReady();
  }

  render() {
    let rowClass = "lobby_row";
    let status = "";

    if (this.props.isReady) {
      rowClass += " ready";
      status = "Ready!";
    }
    else {
      rowClass += " not_ready";
      status = "Waiting...";
    }


    return (
      <div className={rowClass}>
        <h5 className="lobby_player">
          {this.props.username}
        </h5>
        {
          this.props.isUser && !this.props.isReady ?
            <button onClick={this.toggleReady}>
              Ready?
            </button>
            :
            <p className="lobby_status">
              {status}
            </p>
        }
      </div>
    );
  }
}

export default UserItem;