import { useState, useEffect } from "react";
import { getData } from "../firebase/utils";
import getTagsByIds from "./Event/getTagsByIds";
import getUserById from "./Event/getUserById";

const Popup = ({
    title,
    description,
    tags,
    event_time,
    attendees_ids,
    onClose,
}) => {

    const [tagsString, setTags] = useState([]);
    const [attendees, setAttendees] = useState([]);
    useEffect(() => {
        getTagsByIds(tags).then((tags) => setTags(tags));
        console.log(attendees_ids)
        if (attendees_ids.length === 0) return;
        Promise.all(attendees_ids.map(async (attendeeId) => {
            const user = await getUserById(attendeeId);
            return user;
        })).then((attendees) => setAttendees(attendees));
    }, []);

    return (
        <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px',
            zIndex: 1000, // Ensure it's above other content
            border: '1px solid #ccc',
            borderRadius: '15px',
        }}>
            <h2>{title}</h2>
            <p>{description}</p>
            <p>{tagsString.join(', ')}</p>
            <p>{(new Date(event_time)).toLocaleString()}</p>
            <h3>Attendees:</h3>
            <ul>
                {attendees.map((attendee, index) => (
                    <li key={index}>{attendee.username}</li>
                ))}
            </ul>
            <button className="btn btn-primary" onClick={onClose} style={{ marginTop: '10px' }}>Close</button>
        </div>
    );
}

export default Popup;