import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "../App.css";

class History extends React.Component {
  render() {
    return (
      <div>
        <button className="submitButton"> History Holder</button>
      </div>
    );
  }
}

export default withRouter(History);
