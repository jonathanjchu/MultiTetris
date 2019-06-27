import React, { Component } from 'react';
import '../App.css';

class ScoreBox extends Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    return (
      <div id="score_box">
        <h3>Lines: {this.props.lines}</h3>
      </div>
    );
  }
}

export default ScoreBox;