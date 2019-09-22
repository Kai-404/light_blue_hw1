import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import Register from "./pages/register";
import SideBar from "./SideBar/SideBar";
import LoggedIn from "./SideBar/LoggedIn";
import Game from "./game/Game";
import History from "./game/History";

class App extends Component {
  state = {
    LoginFlag: false,
    User: [], //username, password, email
    History: [] //date, status, description
  };

  /**
  //load data at the starting of the application
  componentDidMount() {
    //get user data from spring boot
    axios.get("/users").then(res => this.setState({ users: res.data }));

    axios.get("/history").then(res => this.setState({ events: res.data }));
  }
  */

  login = (email, password) => {
    let data = JSON.stringify({
      email,
      password
    });
    this.setState({ LoginFlag: !this.state.LoginFlag });
    /**
    axios
      .post(`/users/${email}`, data, {
        headers: { "Content-Type": "application/json;charset=UTF-8" }
      })
      .then(res => {
        if (res.data === "") alert("Wrong password");
        else {
          this.setState({
            currentUser: res.data,
            loggedIn: !this.state.loggedIn
          });
        }
      });
      */
  };

  logout = () => {
    this.setState({ LoginFlag: !this.state.LoginFlag });
  };

  render() {
    let bar = <SideBar />;
    if (this.state.LoginFlag) {
      bar = (
        <Route
          render={props => (
            <React.Fragment>
              <LoggedIn logout={this.logout} />
            </React.Fragment>
          )}
        />
      );
    }
    return (
      //side bar will change it's content according to the login status, ex: display history after login
      <Router>
        <div className="App">
          {bar}
          <div className="Home">
            <Route exact path="/" component={HomePage} />
            <Route
              exact
              path="/login"
              render={props => (
                <React.Fragment>
                  <Login login={this.login} />
                </React.Fragment>
              )}
            />
            <Route
              exact
              path="/register"
              render={props => (
                <React.Fragment>
                  <Register />
                </React.Fragment>
              )}
            />
            <Route
              exact
              path="/game"
              render={props => (
                <React.Fragment>
                  <Game />
                </React.Fragment>
              )}
            />
            <Route
              exact
              path="/history"
              render={props => (
                <React.Fragment>
                  <History />
                </React.Fragment>
              )}
            />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
