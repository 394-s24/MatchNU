import { getData } from '../../firebase/utils';

const getUserById = async (userId) => {
  const userSnapshot = await getData(`users/${userId}`);

  if (!userSnapshot.exists()) return null;
  const userVal = userSnapshot.val();
  // return userSnapshot.val();
  const userWithId = {
    id: userId,
    ...userVal
  };
  
  return userWithId;
};

export default getUserById;