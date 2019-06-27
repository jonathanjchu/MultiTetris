import React, { Component } from 'react';
import '../App.css';

class NextPiece extends Component {
  render() {
    let showGrid = [];

    for (let i = 0; i < this.props.shape.length; i++) {
      let row = [];
      for (let j = 0; j < this.props.shape[i].length; j++) {
        row.push("block " + this.props.colorKey[this.props.shape[i][j]]);
      }

      showGrid.push(row);
    }

    return (
      <div id="next_piece">
        <h4>Next:</h4>
        <div className="box">
          {
            showGrid.map((row, i) =>
              <div className="row">
                {
                  row.map((block, j) =>
                    <div className={block}></div>
                  )
                }
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

export default NextPiece;