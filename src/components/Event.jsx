import { useState } from "react";
import "./Event.css";
import Popup from "./Popup";
import { set } from "firebase/database";

const Event = (
	// user,
	// title,
	// description,
	// attendees,
	// tags,
	// thumbnail_url,
	// created_at,
	// event_time,
	props,
) => {
	const [showPopup, setShowPopup] = useState(false);


	const togglePopup = () => {
		setShowPopup(!showPopup);
	}


	return (
		<div className="event">
			<div className="title-button">
				<div className="event-title"> {props.title} </div>
				<div className="host-pfp"> pfp here (?) </div>
				<button className="normal_button" onClick={togglePopup}> Learn More </button>
			</div>
			<img src={"https://dailynorthwestern.com/wp-content/uploads/2020/02/LIBRARY-OwenStidman-WEB.jpg"} alt={props.title} className="event-thumbnail"/>
			
			{showPopup && <Popup {...props} onClose={togglePopup}
        	/>}
		</div>
	);
};

export default Event;
