import { useState, useEffect, useContext } from "react";
import getUserById from "./getUserById";
import getTagsByIds from "./getTagsByIds";
import ProfilePicture from "../../components/ProfilePicture";
import rsvpForEvent from "./rsvpForEvent";
import getRsvpStatus from "./getRsvpStatus";

// import "./Event.css";
import Popup from "../Popup/Popup";
import Tag from "../Tag";
// import Comments from "../Comments/Comments";
import { get } from "firebase/database";
import { UserContext } from "../../contexts/UserContext";


const Event = (
	props,
) => {

	const [poster, setPoster] = useState(null);
	const [tags, setTags] = useState([]);
	const [showPopup, setShowPopup] = useState(false);

	const { user, setUser } = useContext(UserContext);

	const [rsvpStatus, setRsvpStatus] = useState(false);

	useEffect(() => {
		getUserById(props.user_id).then((user) => setPoster(user));
		getTagsByIds(props.tags).then((tags) => setTags(tags));
		getRsvpStatus(user.id, props.id).then((status) => setRsvpStatus(status));
	}, []);

	const togglePopup = () => {
		setShowPopup(!showPopup);
	}

	const toggleRsvp = () => {
		console.log(rsvpStatus)
		if (rsvpStatus) {
			rsvpForEvent(user.id, props.id, false);
		} else {
			rsvpForEvent(user.id, props.id, true);
		}
		setRsvpStatus(!rsvpStatus);
	}
	// console.log(poster);

	return (
		<div className="card m-4">
			<div className="row g-0">
				<div className="col-md-4">
					<img src={props.thumbnail_url} alt={props.title} className="img-fluid rounded-start"/>
				</div>
				<div className="col-md-8">
					<div className="card-body">
						<div className="card-title"> {props.title} </div>
							<div className="card-text">
								{poster && (
									<div>
										{poster.profile_picture ? (
											<ProfilePicture imageURL={poster.profile_picture} />
										) : (
											<ProfilePicture imageURL={"data:image/jpeg;base64,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"}/>
										)}
									<p>Posted by: {poster.username}</p>
									<p>Date: {(new Date(props.event_time)).toLocaleDateString()}</p>
  									<p>Time: {(new Date(props.event_time)).toLocaleTimeString()}</p>
									<p>Location: {props.location}</p>
									</div>
								)}
							</div>
							<div style={{ display: 'flex', flexDirection: 'row',
								justifyContent: 'center', 
								alignItems: 'center', 
								gap: '10px'}}>
							<button className="btn btn-primary mb-3" onClick={togglePopup}> Learn More </button>
							<button className="btn btn-primary mb-3" onClick={toggleRsvp} style={{
							backgroundColor: rsvpStatus ? 'red' : 'green',
							color: rsvpStatus ? 'white' : ''}}> 
							{
								rsvpStatus
									? "Can't go :("
									: 'RSVP'
							
							} </button>
							</div>
							<div>
								{tags.map((tag, index) => (
									<Tag key={index}>{tag['tag']}</Tag>
								))}
							</div>
						

					</div>
					{showPopup && <Popup {...props} onClose={togglePopup} />}
				</div>
			</div>
			
		</div>
		
	);
};

export default Event;
