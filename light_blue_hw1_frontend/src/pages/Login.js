import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

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
          placeholder="cewitconf2018"
          value={this.state.password}
          type="password"
          name="password"
          onChange={this.onChange}
        />
        <br />
        <br />
        <button type="submit" style={submitStyle}>
          Login
        </button>
        {"  "}
        <button type="button" style={submitStyle}>
          <Link style={linkStyle} to="/create-account">
            New Account
          </Link>
        </button>
        {"  "}
        <button type="button" style={submitStyle}>
          <Link style={linkStyle} to="/">
            Cancle
          </Link>
        </button>
      </form>
    );
  }
}

const submitStyle = {
  backgroundColor: "black",
  color: "#fff",
  padding: "12px 20px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer"
};
const linkStyle = {
  color: "#fff",
  textDecoration: "none"
};

export default withRouter(Login);
