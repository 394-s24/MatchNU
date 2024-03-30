import { useState, useEffect } from "react";
import getUserById from "./getUserById";
import getTagsByIds from "./getTagsByIds";
import ProfilePicture from "../../components/ProfilePicture";

// import "./Event.css";
import Popup from "../Popup";

const Event = (
	props,
) => {
	const [poster, setPoster] = useState(null);
	const [tags, setTags] = useState([]);
	const [showPopup, setShowPopup] = useState(false);

	useEffect(() => {
		getUserById(props.user_id).then((user) => setPoster(user));

		getTagsByIds(props.tags).then((tags) => setTags(tags));
	}, []);

	const togglePopup = () => {
		setShowPopup(!showPopup);
	}

	console.log(poster);

	return (
		<div className="card mb-3" style={{margin: "20px"}}>
			<div className="row g-0">
				<div className="col-md-4">
					<img src={"https://dailynorthwestern.com/wp-content/uploads/2020/02/LIBRARY-OwenStidman-WEB.jpg"} alt={props.title} className="img-fluid rounded-start"/>
				</div>
				<div className="col-md-8">
					<div className="card-body">
						<div className="card-title"> {props.title} </div>
							<div className="card-text">
								{poster && (
									<div>
										<ProfilePicture imageURL={"https://courses.cs.northwestern.edu/394/guides/images/me-sept-2014-small.png"} />
									<p>Posted by: {poster.username}</p>
									</div>
								)}
							</div>
							<button className="btn btn-primary" onClick={togglePopup} style={{marginBottom:"15px"}}> Learn More </button>
							<div>
								{tags.map((tag, index) => (
									<span key={index} className="badge rounded-pill bg-info" style={{margin: "2px", fontSize: "14px"}}>{tag}</span>
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
