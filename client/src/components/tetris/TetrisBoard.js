import React, { Component } from 'react';
import '../../App.css';

class TetrisBoard extends Component {

  render() {
    return (
      <div id="main_board">
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

export default TetrisBoard;