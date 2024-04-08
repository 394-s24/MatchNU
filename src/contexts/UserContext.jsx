import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { app } from "../firebase/utils";
import getUserById from "../components/Event/getUserById";


const UserContext = createContext(null);

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const auth = getAuth(app);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        getUserById(firebaseUser.uid).then((user) => setUser(user));
      } 
    });
  
    return () => {
      console.log('Unsubscribing auth listener');
      unsubscribe();
    };
  }, [auth]);
  console.log(children); 

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export { UserContextProvider, UserContext };