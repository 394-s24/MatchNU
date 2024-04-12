import React from "react";
import LoginButton from "./LoginButton";
import './Login.css'

const Login = () => {
  document.body.style.backgroundColor = "#866AB1";
  return (
    <div className="loginButton">
      <div className="logo">
        MatchNU
      </div>
      <LoginButton />
    </div>
  )
};

export default Login;