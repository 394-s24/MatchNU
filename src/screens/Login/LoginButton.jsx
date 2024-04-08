import React, {useEffect} from "react";
import { signInWithRedirect, getAuth, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc} from "firebase/firestore";
import { getDatabase, ref, set, child, get } from 'firebase/database';
import { app } from "../../firebase/utils";

const LoginButton = () => {
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const db = getFirestore(app);
  const createUserInFirestore = async (user) => {
    const dbRef = ref(getDatabase());
    const userRef = child(dbRef, `users/${user.uid}`);
    get(userRef).then((snapshot) => {
      if (!snapshot.exists()) {
        set(userRef, {
          email: user.email,
          first_name: user.displayName.split(' ')[0],
          last_name: user.displayName.split(' ').slice(1).join(' '),
          profile_picture: user.photoURL,
          username: user.displayName,
        }).catch((error) => {
          console.error("Error writing document: ", error);
        });
      }
    }).catch((error) => {
      console.error("Error getting document: ", error);
    });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User signed in:', user);
        createUserInFirestore(user).catch(console.error);
      } else {
        console.log('No user signed in.');
      }
    });
  
    return () => {
      console.log('Unsubscribing auth listener');
      unsubscribe();
    };
  }, [auth, db]);
  

  return (
    <div>
      <button className="login" onClick={() => signInWithRedirect(auth, googleProvider)}>
        Login with Google!
      </button>
    </div>

  );
};

export default LoginButton;

