import { useContext, useEffect } from "react";
import { UserContext } from "./contexts/UserContext";
import { getAuth } from "firebase/auth";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./screens/Homepage";
import Login from "./screens/Login/Login";
import BottomNavbar from "./components/BottomNavbar/BottomNavbar";

const Navigation = () => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    getAuth().onAuthStateChanged((user) => {
      setUser(user);
    });
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
