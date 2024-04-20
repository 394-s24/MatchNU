import React from "react";
import LoginButton from "./LoginButton";
import './Login.css'

const Login = () => {
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