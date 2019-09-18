import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import "../App.css";

class Register extends Component {
  state = {
    username: "",
    email: "@stonybrook.edu",
    password: "",
    password2: "",
    phoneNumber: ""
  };
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const { name, email, password, password2, phoneNumber } = this.state;
    if (password !== password2) {
      this.props.createAccount(name, email, "", phoneNumber);
    } else this.props.createAccount(name, email, password, phoneNumber);
    this.setState({
      name: "",
      email: "@stonybrook.edu",
      password: "",
      password2: "",
      phoneNumber: ""
    });
    this.props.history.push("/");
  };
  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        User Name:
        <input
          className="inputBox"
          placeholder="UserName"
          value={this.state.name}
          type="text"
          name="name"
          onChange={this.onChange}
        />
        <br />
        <br />
        Email:
        <input
          className="inputBox"
          placeholder="first.last@stonybrook.edu"
          value={this.state.email}
          type="text"
          name="email"
          onChange={this.onChange}
        />
        <br />
        <br />
        Password:
        <input
          className="inputBox"
          value={this.state.password}
          type="password"
          name="password"
          onChange={this.onChange}
        />
        <br />
        <br />
        Reenter Password:
        <input
          className="inputBox"
          value={this.state.password2}
          type="password"
          name="password2"
          onChange={this.onChange}
        />
        <br />
        <br />
        Phone Number:
        <input
          className="inputBox"
          placeholder={"1234567890"}
          value={this.state.phoneNumber}
          type="text"
          name="phoneNumber"
          onChange={this.onChange}
        />
        <br />
        <br />
        <button type="submit" className="submitButton">
          Submit
        </button>
        {"  "}
        <button type="button" className="submitButton">
          <Link to="/">Cancle</Link>
        </button>
      </form>
    );
  }
}

export default withRouter(Register);
