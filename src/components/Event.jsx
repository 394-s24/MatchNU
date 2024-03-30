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
		// <div className="event">
		// 	<div className="title-button">
		// 		<div className="event-title"> {props.title} </div>
		// 		<button className="normal_button" onClick={togglePopup}> Learn More </button>
		// 	</div>
		// 	<img src={"https://dailynorthwestern.com/wp-content/uploads/2020/02/LIBRARY-OwenStidman-WEB.jpg"} alt={props.title} className="event-thumbnail"/>
			
		// 	{showPopup && <Popup {...props} onClose={togglePopup}
        // 	/>}
		// </div>
		<div className="card mb-3" style={{margin: "20px"}}>
			<div className="row g-0">
				<div className="col-md-4">
					
					<img src={"https://dailynorthwestern.com/wp-content/uploads/2020/02/LIBRARY-OwenStidman-WEB.jpg"} alt={props.title} className="img-fluid rounded-start"/>
					
					
				</div>
				<div className="col-md-8">
					<div className="card-body">
						<div className="card-title"> {props.title} </div>
						<button className="btn btn-primary" onClick={togglePopup}> Learn More </button>
					</div>
					{showPopup && <Popup {...props} onClose={togglePopup}
						/>}
				</div>
			</div>
			
		</div>
		
	);
};

export default Event;
