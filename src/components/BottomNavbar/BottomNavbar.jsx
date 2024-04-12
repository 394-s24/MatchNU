import { getAuth } from "firebase/auth";
import "./BottomNavbar.css";

const BottomNavbar = () => {
  return (
    <div id='bottom-navbar'>
      {/* home */}
      <button><i className="bi bi-house h2"></i></button> 
      {/* create event */}
      <button><i className="bi bi-plus-circle h2"></i></button>
      {/* <button><i className="bi bi-calendar-event h2"></i></button> */}
      {/* profile */} 
      {/* <button><i className="bi bi-person-square h2"></i></button> */}
      {/* sign out */}
      <button onClick={() => getAuth().signOut()}><i className="bi bi-box-arrow-right h2"></i></button>
    </div>
  );
};

export default BottomNavbar;