import { getData } from '../../firebase/utils';

const getUserById = async (userId) => {
  const userSnapshot = await getData(`users/${userId}`);

  if (!userSnapshot.exists()) return null;
  
  return userSnapshot.val();
};

export default getUserById;