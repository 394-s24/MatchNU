import { useState } from "react";
import "./Event.css";

const Event = ({
	user,
	title,
	description,
	attendees,
	tags,
	thumbnail_url,
	created_at,
	event_time,
}) => {
	const [showPopup, setShowPopup] = useState(false);

	const eventLearnMore = () => {
		setShowPopup(true);
	};

	return (
		<div className="event">
			<div className="title-button">
				<div className="event-title"> {title} </div>
				<button className="normal_button" onClick={eventLearnMore}> Learn More </button>
			</div>
			<img src={"https://dailynorthwestern.com/wp-content/uploads/2020/02/LIBRARY-OwenStidman-WEB.jpg"} alt={title} className="event-thumbnail"/>
			
			{showPopup && <div className="popup"></div>}
		</div>
	);
};

export default Event;
