import React from "react";
import "./App.css";

import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./pages/Login";
import LoginHeader from "./Header/LoginHeader";
import HomePage from "./pages/HomePage";
import Register from "./pages/register";

function App() {
  return (
    <Router>
      <div className="App">
        <LoginHeader />
        <div className="Home">
          <Route exact path="/" component={HomePage} />
          <Route
            exact
            path="/login"
            render={props => (
              <React.Fragment>
                <Login />
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
        </div>
      </div>
    </Router>
  );
}

export default App;
