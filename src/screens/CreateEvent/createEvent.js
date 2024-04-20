import { db } from '../../firebase/utils';
import { collection, addDoc } from 'firebase/firestore';
import { pushData } from '../../firebase/utils';

const createEvent = async (event) => {
  await pushData(`events`, event);
};

export default createEvent;
