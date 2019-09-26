import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { slide as Menu } from "react-burger-menu";

import "../App.css";

class LoggedIn extends Component {
  logout = () => {
    this.props.logout();
  };

  render() {
    return (
      <header>
        <h1>Light Blue Stratego</h1>
        <Menu>
          <Link className="link" to="/">
            Home
          </Link>
          <Link className="link" to="/" onClick={this.logout}>
            Logout
          </Link>
          <br></br>
          <Link className="link" to="/register">
            Register
          </Link>
          <br />
          <Link className="link" to="/game">
            Stratego
          </Link>
          <br></br>
          <Link className="link" to="/history">
            History
          </Link>
        </Menu>
      </header>
    );
  }
}

//propTypes
LoggedIn.propTypes = {
  logout: PropTypes.func.isRequired
};

export default LoggedIn;
