import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import "../App.css";

class Login extends Component {
  //state/info used for login
  state = {
    userName: "anonymous",
    password: "cse308hw1"
  };

  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        User Name:
        <input
          className="input"
          placeholder="anonymous"
          value={this.state.email}
          type="text"
          name="email"
          onChange={this.onChange}
        />
        <br />
        <br />
        Password:
        <input
          className="input"
          placeholder="cse308hw1"
          value={this.state.password}
          type="password"
          name="password"
          onChange={this.onChange}
        />
        <br />
        <br />
        <button type="submit" className="submitButton">
          Login
        </button>
        {"  "}
        <button type="button" className="submitButton">
          <Link className="linkStyle" to="/register">
            New Account
          </Link>
        </button>
        {"  "}
        <button type="button" className="submitButton">
          <Link className="linkStyle" to="/">
            Cancle
          </Link>
        </button>
      </form>
    );
  }
}

export default withRouter(Login);
