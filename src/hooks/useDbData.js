import { useEffect, useState } from "react";
import { db } from "../firebase/utils";
import { onValue, ref } from "firebase/database";

const useDbData = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onValue(
      ref(db, path),
      (snapshot) => {
        setData(snapshot.val());
      },
      (error) => {
        setError(error);
      }
    );

    return () => unsubscribe();
  }, [path]);

  return [data, error];
};

export default useDbData;
