import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import "../App.css";
import axios from "axios";

class Login extends Component {
  //state/info used for login
  state = {
    email: "",
    password: "",
      errmsg: ""
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
        if (email === "" || password === "") {
            this.setState({errmsg: "fill in all blanks"})
        }
        else {
            axios.get("/login", {
                headers: {"Content-Type": "application/json;charset=UTF-8"},
                params: {email: email, password: password}
            })
                .then(res => {
                    if (res.data != "") {
                        this.props.login(res.data)
                        this.setState({
                            email: "",
                            password: ""
                        });
                        this.props.history.push("/")
                    } else {
                        this.setState({errmsg: "Invalid username/email or password"});
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };

  render() {
    return (
        <div>
        <p className="errmsg">{this.state.errmsg}</p>
        <form className="form" onSubmit={this.onSubmit}>
        Username or Email:
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
          Cancel
        </button>
      </form>
        </div>
    );
  }
}

export default withRouter(Login);
