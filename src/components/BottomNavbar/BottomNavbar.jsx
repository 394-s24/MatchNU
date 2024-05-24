import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./BottomNavbar.css";

const BottomNavbar = () => {
  const navigate = useNavigate();

  return (
    <div id="bottom-navbar" data-testid="bottom-navbar">
      <button onClick={() => navigate("/")}>
        <i className="bi bi-house h2"></i>
      </button>
      <button
        onClick={() => navigate("/create-event")}
        data-testid="create-event-button"
      >
        <i className="bi bi-plus-circle h2"></i>
      </button>
      <button onClick={() => getAuth().signOut()}>
        <i className="bi bi-box-arrow-right h2"></i>
      </button>
    </div>
  );
};

export default BottomNavbar;
