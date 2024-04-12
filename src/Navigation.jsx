import { useContext, useEffect } from "react";
import { UserContext } from "./contexts/UserContext";
import { getAuth } from "firebase/auth";
import { getData, setData } from "./firebase/utils";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./screens/Homepage";
import Login from "./screens/Login/Login";
import BottomNavbar from "./components/BottomNavbar/BottomNavbar";

const Navigation = () => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged(async (user) => {
      if (user) {
        setUser({
          id: user.uid,
          email: user.email,
          first_name: user.displayName.split(' ')[0],
          last_name: user.displayName.split(' ').slice(1).join(' '),
          profile_picture: user.photoURL,
          username: user.displayName,
        });

        const userSnapshot = await getData(`/users/${user.uid}`);
        
        if (userSnapshot.exists()) return;

        await setData(`/users/${user.uid}`, {
          email: user.email,
          first_name: user.displayName.split(' ')[0],
          last_name: user.displayName.split(' ').slice(1).join(' '),
          profile_picture: user.photoURL,
          username: user.displayName,
        }); 
      }
      else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      {!!user ? (
        <div>
          <Routes>
            <Route path="/" element={<Homepage />} />
          </Routes>
          <BottomNavbar />
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default Navigation;
