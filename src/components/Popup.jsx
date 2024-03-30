import { useState, useEffect } from "react";
import { getData } from "../firebase/utils";

const Popup = ({
    title,
    description,
    tags,
    event_time,
    onClose
}) => {

    const [tagsString, setTags] = useState([]);
    useEffect(() => {
        const getTags = async () => {
            const tagsSnapshot = await getData('tags');
            if (!tagsSnapshot.exists()) return;
            const tagsVal = tagsSnapshot.val();
            setTags(Object.keys(tagsVal).map((tag) => tagsVal[tag]));
        };
        getTags();
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
            <button className="btn btn-primary" onClick={onClose} style={{ marginTop: '10px' }}>Close</button>
        </div>
    );
}

export default Popup;