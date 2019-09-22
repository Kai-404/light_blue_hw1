import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import "../App.css";

class LoggedIn extends Component {
  logout = () => {
    this.props.logout();
  };

  render() {
    return (
      <header>
        <h1>Light Blue Stratego</h1>
        <br></br>
        <div className="pageHeader">
          <Link className="link" to="/">
            Home
          </Link>
          <Link className="link" to="/" onClick={this.logout}>
            Logout
          </Link>
          <br></br>
          <Link className="link" to="/game">
            Stratego
          </Link>
          <br></br>
          <Link className="link" to="/history">
            History
          </Link>
        </div>
      </header>
    );
  }
}

//propTypes
LoggedIn.propTypes = {
  logout: PropTypes.func.isRequired
};

export default LoggedIn;
