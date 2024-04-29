import { db, getData } from "../../firebase/utils";

export const getCommentsForEvent = async (eventId) => {
  const snapshot = getData(commentsPath);

  if (snapshot.exists) {
    const commentsArray = [];
    snapshot.forEach((childSnapshot) => {
      commentsArray.push({ id: childSnapshot.key, ...childSnapshot.val() });
    });
    return commentsArray;
  } else {
    return [];
  }
};
