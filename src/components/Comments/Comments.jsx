import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from "../../contexts/UserContext";
import { getCommentsForEvent } from './getCommentsforEvent';
import { addComment } from './addComment'; 
import ProfilePicture from '../../components/Profile/Profile'; 

const Comments = ({ eventId, userId, userDisplayName, userProfilePicture }) => {
    
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    const { user } = useContext(UserContext);

    console.log(user);
    console.log(eventId, userId, userDisplayName, userProfilePicture);

    useEffect(() => {
        const fetchComments = async () => {
            const fetchedComments = await getCommentsForEvent(eventId);
            setComments(fetchedComments);
        };

        fetchComments();
    }, [eventId]);

    const handleInputChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        await addComment({ text: newComment, eventId }, userId, userDisplayName, userProfilePicture);
        setComments([...comments, { text: newComment, userDisplayName, userProfilePicture, createdAt: new Date().toISOString() }]);
        setNewComment('');
        setShowPopup(false); 
    };

    return (
        <div>
            <h3>Comments</h3>
            {comments.length > 0 ? comments.map((comment, index) => (
                <div key={index} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
                    <ProfilePicture imageURL={comment.userProfilePicture || 'default_image_url'} />
                    <p><strong>{comment.userDisplayName || 'Anonymous'}</strong> says:</p>
                    <p>{comment.text}</p>
                    <small>Posted on {new Date(comment.createdAt).toLocaleDateString()} at {new Date(comment.createdAt).toLocaleTimeString()}</small>
                </div>
            )) : <p>No comments yet. Be the first to comment!</p>}

            <button className="btn btn-primary mb-3" onClick={() => setShowPopup(true)}>Send Comment</button>

            {showPopup && (
                <div style={{ position: "fixed", top: "20%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "#fff", padding: "20px", zIndex: 100 }}>
                    <form onSubmit={handleCommentSubmit}>
                        <textarea
                            value={newComment}
                            onChange={handleInputChange}
                            placeholder="Write a comment..."
                            style={{ width: '300px', height: '100px' }}
                        />
                        <button className="btn btn-secondary mb-3" style={{marginRight: '10px'}} type="submit">Submit Comment</button>
                        <button className="btn btn-secondary mb-3" onClick={() => setShowPopup(false)}>Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Comments;
