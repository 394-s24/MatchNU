import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./BottomNavbar.css";

const BottomNavbar = () => {
  const navigate = useNavigate();

  return (
    <div id='bottom-navbar'>
      {/* home */}
      <button onClick={() => navigate('/')}><i className="bi bi-house h2"></i></button> 
      {/* create event */}
      <button onClick={() => navigate('/create-event')}><i className="bi bi-plus-circle h2"></i></button>
      {/* <button><i className="bi bi-calendar-event h2"></i></button> */}
      {/* profile */} 
      {/* <button><i className="bi bi-person-square h2"></i></button> */}
      {/* sign out */}
      <button onClick={() => getAuth().signOut()}><i className="bi bi-box-arrow-right h2"></i></button>
    </div>
  );
};

export default BottomNavbar;