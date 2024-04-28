import { pushData } from '../../firebase/utils'

export const addComment = async (comment, userId, userDisplayName, userProfilePicture) => {
    const commentWithUser = {
        ...comment,
        userId,
        userDisplayName,
        userProfilePicture
    };
    const commentPath = 'comments/' + comment.eventId;
    const commentRef = await pushData(commentPath, commentWithUser);
    return { ...commentWithUser, id: commentRef.key };
};
