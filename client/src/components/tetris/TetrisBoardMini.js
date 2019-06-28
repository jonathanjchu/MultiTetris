import React, { Component } from 'react';
import '../../App.css';

class TetrisBoardMini extends Component {

  render() {
    return (
      <div className="mini_board">
        <h5>{this.props.username}</h5>
        {
          this.props.board.map((row, i) =>
            <div className="row" key={i}>
              {
                row.map((color, j) =>
                  <div className={`block ${this.props.colorKey[color]}`} key={j}></div>
                )
              }
            </div>
          )
        }
      </div>
    );
  }
}

export default TetrisBoardMini;