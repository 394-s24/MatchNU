import React from "react";
import { signInWithRedirect, getAuth, GoogleAuthProvider } from "firebase/auth";
import { app } from "../../firebase/utils";

const LoginButton = () => {
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  return (
    <div>
      <button className="login" onClick={() => signInWithRedirect(auth, googleProvider)}>
        Login with Google!
      </button>
    </div>

  );
};

export default LoginButton;

