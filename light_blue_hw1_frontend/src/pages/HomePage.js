import React, { Component } from "react";
import { withRouter } from "react-router";
import "../App.css";

class HomePage extends Component {
  render() {
    return (
      <React.Fragment>
        <p className="notes">
          Welcome to the light blue online{" "}
          <a href="https://www.wikihow.com/Play-Stratego">Stratego</a>
          . You can click on the play button to play the game online <br />
          Note: if you want to record all your game results please have an
          account and logged in
        </p>

        <button type="button" className="playBotton">
          Game holder play
        </button>
        <br></br>
      </React.Fragment>
    );
  }
}

export default withRouter(HomePage);
