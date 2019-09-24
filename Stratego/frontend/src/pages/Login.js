import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import "../App.css";

class Login extends Component {
  //state/info used for login
  state = {
    userName: "",
    password: ""
  };

  routeChangeL = () => {
    let path = "/register";
    this.props.history.push(path);
  };
  routeChangeC = () => {
    let path = "/";
    this.props.history.push(path);
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });
  onSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.login(email, password);
    this.setState({
      email: "",
      password: ""
    });
    this.props.history.push("/");
  };

  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        User Name:
        <input
          className="input"
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
        <button
          type="button"
          className="submitButton"
          onClick={this.routeChangeL}
        >
          New Account
        </button>
        {"  "}
        <button
          type="button"
          className="submitButton"
          onClick={this.routeChangeC}
        >
          Cancle
        </button>
      </form>
    );
  }
}

export default withRouter(Login);
