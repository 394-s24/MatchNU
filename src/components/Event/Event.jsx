import { useState, useEffect } from "react";
import getUserById from "./getUserById";
import "./Event.css";
import Popup from "../Popup";

const Event = (
	props,
) => {
	const [poster, setPoster] = useState(null);
	const [showPopup, setShowPopup] = useState(false);

	useEffect(() => {
		getUserById(props.user_id).then((user) => setPoster(user));
	}, []);

	const togglePopup = () => {
		setShowPopup(!showPopup);
	}

	console.log(poster);

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
						<div className="card-body">
							<div className="card-text">
								{poster && poster.username }
							</div>
							<button className="btn btn-primary" onClick={togglePopup}> Learn More </button>
							<div>
								{props.tags.map((tag, index) => (
									<span key={index} className="badge badge-pill badge-secondary"{... tag}></span>
								))}
							</div>
						</div> 
						

					</div>
					{showPopup && <Popup {...props} onClose={togglePopup}
						/>}
				</div>
			</div>
			
		</div>
		
	);
};

export default Event;
