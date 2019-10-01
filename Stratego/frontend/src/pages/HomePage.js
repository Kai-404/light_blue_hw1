import React, { Component } from "react";
import { withRouter } from "react-router";
import "../App.css";

class HomePage extends Component {
  routeChange = () => {
    this.props.history.push("/login");
  };

  state = {msgPart1: "", msgPart2: ""};

  changeMsg() {
    if (this.props.User == null) {
      this.state.msgPart1 = "Welcome to the light blue online Stratego"
      this.state.msgPart2 = "Note: You must be logged in to play the game"
    }
    else {
      this.state.msgPart1 = "Hello " + this.props.User.username + ","
      this.state.msgPart2 = "Welcome to the light blue online Stratego"
    }
  }

  render() {
    return (
      <React.Fragment>
        <p className="notes">
          {this.changeMsg()}
          {this.state.msgPart1}
          <br />
          {this.state.msgPart2}
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
