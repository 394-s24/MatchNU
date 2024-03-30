import { initializeApp } from 'firebase/app';
import { getDatabase, get, ref } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC06R40JMEz9Wn2e-kw-5ipZIKQQwThGVY",
  authDomain: "matchnu-b99ec.firebaseapp.com",
  databaseURL: "https://matchnu-b99ec-default-rtdb.firebaseio.com",
  projectId: "matchnu-b99ec",
  storageBucket: "matchnu-b99ec.appspot.com",
  messagingSenderId: "383025274563",
  appId: "1:383025274563:web:e066b3201fc62265570c76"
};

initializeApp(firebaseConfig);

const db = getDatabase();

const getData = async (pathname) => {
    return await get(ref(db, pathname));
};

export default getData;