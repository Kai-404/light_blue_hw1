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
        password2: ""
    };
    routeChange = () => {
        this.props.history.push("/");
    };
    onChange = e => this.setState({ [e.target.name]: e.target.value });

    //TODO: if registered then use this new account to Login, jump to loggedIn bar
    register = (name, email, password) => {
        let data = JSON.stringify({
            name,
            email,
            password
        });
        axios
            .post("/register", data, {
                headers: { "Content-Type": "application/json;charset=UTF-8" }
            })
            .then(res => {
                if (res.data === 0) {
                    alert("Fail to create new Account, invalid email");
                } else if (res.data === 1) {
                    alert("Fail to create new Account, email already exists");
                } else if (res.data === 2)
                    alert("Fail to create new Account, username already exists");
                else {
                    alert("Success")
                }
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    };

    onSubmit = e => {
        e.preventDefault();
        const { name, email, password, password2 } = this.state;
        if (name === "" || email == "" || password === "" || password2 === "") {
            alert("fill in all fields")
        }
        else if (/\S+@\S+\.\S+/.test(email) == false) { alert("invalid email")}
        else if (password !== password2) {
            alert("Fail to create new Account, password don't match");
        } else {
            this.register(name, email, password);

            this.setState({
                name: "",
                email: "@stonybrook.edu",
                password: "",
                password2: ""
            });
            this.props.history.push("/");
        }
    };

    render() {
        return (
            <form className="form" onSubmit={this.onSubmit}>
                User Name:
                <input
                    className="input"
                    value={this.state.name}
                    type="text"
                    name="name"
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
                    Cancle
                </button>
            </form>
        );
    }
}

//propTypes
Register.propTypes = {
    Register: PropTypes.func.isRequired
};

export default withRouter(Register);
