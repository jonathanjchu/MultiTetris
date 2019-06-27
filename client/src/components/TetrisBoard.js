import React, { Component } from 'react';
import '../App.css';

class TetrisBoard extends Component {

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

    return (
      <div id="main_board">
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

export default TetrisBoard;