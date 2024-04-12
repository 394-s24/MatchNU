import React, { useState } from 'react';

const CreateEventPopup = ({ onClose, onCreate }) => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({ title, location });
    onClose(); 
  };

  return (
    <div className="popup">
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Event Title"
        />
        <input 
          type="text" 
          value={location} 
          onChange={(e) => setLocation(e.target.value)} 
          placeholder="Location"
        />
        <button type="submit">Create Event</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default CreateEventPopup;
