import { pushData } from "../../firebase/utils";

export const addComment = async (text, eventId, userId) => {
  const comment = {
    text,
    user_id: userId,
    created_at: new Date().toISOString(),
  };

  const commentRef = await pushData(`comments/${eventId}`, comment);
  return { ...comment, id: commentRef.key };
};
