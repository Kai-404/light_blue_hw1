import React, { Component } from "react";
import { withRouter } from "react-router";
import "../App.css";

class HomePage extends Component {
  routeChange = () => {
    this.props.history.push("/login");
  };

  render() {
    return (
      <React.Fragment>
        <p className="notes">
          Welcome to the light blue online Stratego
          <br />
          Note: You must be logged in to play the game
          <br />
          <a href="https://www.wikihow.com/Play-Stratego">
            Click to learn about Stratego
          </a>
        </p>
        {/** 
          <button
            type="button"
            className="playBotton"
            onClick={this.routeChange}
          >
            Login
          </button>
          */}
        <br></br>
      </React.Fragment>
    );
  }
}

export default withRouter(HomePage);
