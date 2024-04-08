import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import "./BottomNavbar.css";

const BottomNavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user); 
      });
      return () => unsubscribe(); 
  }, []);
  const navigateToProfile = () => {
    navigate('/profile'); 
  };
  const navigateToHome = () => {
    navigate('/'); 
  };
  return (
    <div id='bottom-navbar'>
      {/* home */}
      <button onClick={navigateToHome}><i className="bi bi-house h2"></i></button> 
      {/* create event */}
      {/* <button><i className="bi bi-calendar-event h2"></i></button> */}
      {/* profile */} 
      {isLoggedIn && (
        <button onClick={navigateToProfile}><i className="bi bi-person-square h2"></i></button>
      )}
      {/* sign out */}
      <button onClick={() => getAuth().signOut()}><i className="bi bi-box-arrow-right h2"></i></button>
    </div>
  );
};

export default BottomNavbar;