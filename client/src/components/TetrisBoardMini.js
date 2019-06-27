import React, { Component } from 'react';
import '../App.css';

class TetrisBoardMini extends Component {

  render() {
    let colorKey = [
      "blank",
      "blue",
      "purple",
      "green",
      "orange",
      "red",
      "yellow",
      "gray"
    ];

    console.log(this.props.board);

    return (
      <div className="mini_board">
        <h5>{this.props.username}</h5>
        {
          this.props.board.map((row, i) =>
            <div className="row" key={i}>
              {
                row.map((color, j) =>
                  <div className={`block ${colorKey[color]}`} key={j}></div>
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