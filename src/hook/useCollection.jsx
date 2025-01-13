import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";

export function useCollection(collectionName) {
  const [documents, setDocuments] = useState(null);
  useEffect(() => {
    const q = collection(db, collectionName);
    onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((snapshot) => {
        data.push({ id: snapshot.id, ...snapshot.data() });
      });
      setDocuments(data);
    });
  }, [collectionName]);

  return { documents };
}
