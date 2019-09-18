import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function LoginHeader() {
  return (
    <header>
      <h1>Light Blue Stratego</h1>
      <Link className="link" to="/">
        Home
      </Link>
      {"  "}|{"  "}
      <Link className="link" to="/login">
        Login
      </Link>
      {"  "}|{"  "}
      <Link className="link" to="/register">
        Register
      </Link>
    </header>
  );
}

export default LoginHeader;
