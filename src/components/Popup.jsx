import { useState } from "react";

const Popup = ({
    title,
    description,
    tags,
    event_time,
    onClose 
    }) => {
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
          borderRadius: '5px',
        }}>
            <h2>{title}</h2>
            <p>{description}</p>
            <p>{tags.join(', ')}</p>
            <p>{event_time}</p>
            <button onClick={onClose} style={{ marginTop: '10px' }}>Close</button>
        </div>
      );
}

export default Popup;