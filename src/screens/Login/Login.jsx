import React, { useContext } from "react";
import LoginButton from "./LoginButton";
import './Login.css'
import { Navigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

const Login = () => {
  const { user } = useContext(UserContext);

  if (user) return <Navigate to="/" />;

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