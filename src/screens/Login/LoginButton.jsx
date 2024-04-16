import React from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase/utils";

const LoginButton = () => {
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  return (
    <div>
      <button className="login" onClick={() => signInWithPopup(auth, googleProvider)}>
        Login with Google!
      </button>
    </div>

  );
};

export default LoginButton;

