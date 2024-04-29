import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { getCommentsForEvent } from "./getCommentsforEvent";
import { addComment } from "./addComment";
import ProfilePicture from "../ProfilePicture";
import useDbData from "../../hooks/useDbData";
import getUserById from "../Event/getUserById";

const Comments = ({ eventId, userId, userDisplayName, userProfilePicture }) => {
  const [comments, setComments] = useState([]);
  const [commentsVal, setCommentsVal] = useDbData(`comments/${eventId}`);
  const [newComment, setNewComment] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const { user } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      if (!commentsVal) {
        setComments([]);
        return [];
      }

      const commentsArray = await Promise.all(
        Object.values(commentsVal).map(async (comment) => {
          const user = await getUserById(comment.user_id);

          return {
            text: comment.text,
            user,
            created_at: comment.created_at,
          };
        })
      );

      setComments(commentsArray);
    })();
  }, [commentsVal]);

  const handleInputChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = await addComment(newComment, eventId, user.id);

    // setComments([...comments, comment]);
    setNewComment("");
    setShowPopup(false);
  };

  if (!comments) return null;

  return (
    <div>
      <h3>Comments</h3>
      {comments.length > 0 ? (
        comments
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .map((comment, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <ProfilePicture imageURL={comment.user.profile_picture_url} />
              <p>
                <strong>{comment.user.username || "Anonymous"}</strong> says:
              </p>
              <p>{comment.text}</p>
              <small>
                Posted on {new Date(comment.created_at).toLocaleDateString()} at{" "}
                {new Date(comment.created_at).toLocaleTimeString()}
              </small>
            </div>
          ))
      ) : (
        <p>No comments yet. Be the first to comment!</p>
      )}

      <button
        className="btn btn-primary mb-3"
        onClick={() => setShowPopup(true)}
      >
        Send Comment
      </button>

      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: "20%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            padding: "20px",
            zIndex: 100,
          }}
        >
          <form onSubmit={handleCommentSubmit}>
            <textarea
              value={newComment}
              onChange={handleInputChange}
              placeholder="Write a comment..."
              style={{ width: "300px", height: "100px" }}
            />
            <button
              className="btn btn-primary mb-3"
              style={{ marginRight: "10px" }}
              type="submit"
            >
              Submit Comment
            </button>
            <button
              className="btn btn-secondary mb-3"
              onClick={() => setShowPopup(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Comments;
