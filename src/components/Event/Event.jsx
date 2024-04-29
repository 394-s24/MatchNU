import { useState, useEffect, useContext } from "react";
import getUserById from "./getUserById";
import getTagsByIds from "./getTagsByIds";
import ProfilePicture from "../../components/ProfilePicture";
import rsvpForEvent from "./rsvpForEvent";
import getRsvpStatus from "./getRsvpStatus";

// import "./Event.css";
import Popup from "../Popup/Popup";
import Tag from "../Tag";
import Comments from "../Comments/Comments";
import { get } from "firebase/database";
import { UserContext } from "../../contexts/UserContext";

const Event = (props) => {
  const [poster, setPoster] = useState(null);
  const [tags, setTags] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const { user, setUser } = useContext(UserContext);

  const [rsvpStatus, setRsvpStatus] = useState(false);
  const [comments, setComments] = useState(false);

  useEffect(() => {
    getUserById(props.user_id).then((user) => setPoster(user));
    getTagsByIds(props.tags).then((tags) => setTags(tags));
    getRsvpStatus(user.id, props.id).then((status) => setRsvpStatus(status));
  }, []);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const toggleRsvp = () => {
    console.log(rsvpStatus);
    if (rsvpStatus) {
      rsvpForEvent(user.id, props.id, false);
    } else {
      rsvpForEvent(user.id, props.id, true);
    }
    setRsvpStatus(!rsvpStatus);
  };

  const toggleComments = () => {
    setComments(!comments);
  };

  return (
    <div className="card m-4">
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={
              props.thumbnail_url !== "" && props.thumbnail_url !== null
                ? props.thumbnail_url
                : "https://img.freepik.com/free-photo/abstract-surface-textures-white-concrete-stone-wall_74190-8189.jpg"
            }
            alt={props.title}
            className="img-fluid rounded-start"
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <div className="card-title"> {props.title} </div>
            <div className="card-text">
              {poster && (
                <div>
                  <ProfilePicture imageURL={poster.profile_picture} />
                  <p>Posted by: {poster.username}</p>
                  <p>Date: {new Date(props.event_time).toLocaleDateString()}</p>
                  <p>Time: {new Date(props.event_time).toLocaleTimeString()}</p>
                  <p>Location: {props.location}</p>
                </div>
              )}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <button className="btn btn-primary mb-3" onClick={togglePopup}>
                {" "}
                Learn More{" "}
              </button>
              <button
                className="btn btn-primary mb-3"
                onClick={toggleRsvp}
                style={{
                  backgroundColor: rsvpStatus ? "red" : "green",
                  color: rsvpStatus ? "white" : "",
                }}
              >
                {rsvpStatus ? "Can't go :(" : "RSVP"}{" "}
              </button>

              <button
                className="btn btn-primary mb-3 bi bi-chat-left-text-fill"
                onClick={toggleComments}
              ></button>
            </div>
            <div>
              {tags.map((tag, index) => (
                <Tag key={index}>{tag["tag"]}</Tag>
              ))}
            </div>
          </div>
          {showPopup && <Popup {...props} onClose={togglePopup} />}
          {comments && <Comments eventId={props.id} onClose={toggleComments} />}
        </div>
      </div>
    </div>
  );
};

export default Event;
