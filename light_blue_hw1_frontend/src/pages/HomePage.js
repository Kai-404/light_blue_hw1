import React, { Component } from "react";
import { withRouter } from "react-router";

class HomePage extends Component {
  render() {
    return (
      <React.Fragment>
        <p>Welcome to the light blue online Stratego</p>
        <br />
        <button>play</button>
        <p> Game holder</p>
      </React.Fragment>
    );
  }
}

export default withRouter(HomePage);
