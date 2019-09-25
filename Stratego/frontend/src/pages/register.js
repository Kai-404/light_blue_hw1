import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import axios from "axios";
import "../App.css";
import Login from "./Login";

class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    password2: "",
      errmsg: ""
  };
  routeChange = () => {
    this.props.history.push("/");
  };
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  //TODO: if registered then use this new account to Login, jump to loggedIn bar
    register = (username, email, password) => {
        let data = JSON.stringify({
            username,
            email,
            password
        });
        axios
            .post("/register", data, {
                headers: { "Content-Type": "application/json;charset=UTF-8" },
                params: {username: username, email: email, password: password}
            })
            .then(res => {
                if (res.data === 0) {
                    this.setState({errmsg: "Fail to create new Account, invalid email"});
                } else if (res.data === 1) {
                    this.setState({errmsg: "Fail to create new Account, email already exists"});
                } else if (res.data === 2)
                    this.setState({errmsg: "Fail to create new Account, username already exists"});
                else {
                    this.setState({errmsg: "registration successful"})
                }
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    };

    onSubmit = e => {
        e.preventDefault();
        const { username, email, password, password2 } = this.state;
        if (username === "" || email == "" || password === "" || password2 === "") {
            this.setState({errmsg: "fill in all fields"})
        }
        else if (/\S+@\S+\.\S+/.test(email) == false) { this.setState({errmsg: "invalid email"})}
        else if (password !== password2) {
            this.setState({errmsg: "Fail to create new Account, password don't match"});
        }
        else if (password.length < 8) {
            this.setState({errmsg: "password needs to be at least 8 characters long"})
        } else {
            this.register(username, email, password);

            this.setState({
                username: "",
                email: "",
                password: "",
                password2: ""
            });
            this.props.history.push("/");
        }
    };

  render() {
    return (
        <div>
            <p className="errmsg">{this.state.errmsg}</p>
      <form className="form" onSubmit={this.onSubmit}>
        User Name:
        <input
          className="input"
          value={this.state.username}
          type="text"
          name="username"
          onChange={this.onChange}
        />
        <br />
        <br />
        Email:
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
        Reenter Password:
        <input
          className="input"
          value={this.state.password2}
          type="password"
          name="password2"
          onChange={this.onChange}
        />
        <br />
        <br />
        <button type="submit" className="submitButton">
          Submit
        </button>
        {"  "}
        <button
          type="button"
          className="submitButton"
          onClick={this.routeChange}
        >
          Cancel
        </button>
      </form>
        </div>
    );
  }
}

//propTypes
Register.propTypes = {
  Register: PropTypes.func.isRequired
};

export default withRouter(Register);
