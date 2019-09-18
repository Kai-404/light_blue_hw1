import React from "react";
import "./App.css";

import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./pages/Login";
import LoginHeader from "./Header/LoginHeader";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router>
      <div className="App">
        <LoginHeader />
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
      </div>
    </Router>
  );
}

export default App;
