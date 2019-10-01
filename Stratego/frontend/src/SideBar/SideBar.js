import React from "react";
import { Link } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import "../App.css";

function SideBar() {
  return (
    <header>
      <h1>Light Blue Stratego</h1>
      <Menu>
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
      </Menu>
    </header>
  );
}

export default SideBar;
