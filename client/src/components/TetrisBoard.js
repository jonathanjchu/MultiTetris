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

    console.log(this.props.board);

    return (
      <div>
        {
          this.props.board.map((row, i) =>
            <div className="row" key={i}>
              {
                row.map((color, j) =>
                  <>
                    {
                      color === 0 ?
                        <div className="block" key={j}></div>
                        :
                        <div className={`block ${colorKey[color]}`} key={j}></div>
                    }
                  </>

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