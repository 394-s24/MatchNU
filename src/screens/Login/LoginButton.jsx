import React from "react";
import { login } from "../../firebase/utils";

const LoginButton = () => {
  return (
    <div>
      <button className="login" onClick={login}>
        Login with Google!
      </button>
    </div>

  );
};

export default LoginButton;

