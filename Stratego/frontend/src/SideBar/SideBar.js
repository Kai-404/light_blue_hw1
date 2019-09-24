import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function SideBar() {
  return (
    <header>
      <h1>Light Blue Stratego</h1>
      <div className="sidebar">
        <Link className="link" to="/">
          Home
        </Link>
        <br></br>
        <Link className="link" to="/login">
          Login
        </Link>
        <br></br>
        <Link className="link" to="/register">
          Register
        </Link>
      </div>
    </header>
  );
}

export default SideBar;
