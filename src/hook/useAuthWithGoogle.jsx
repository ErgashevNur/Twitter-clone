import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { doc, setDoc } from "firebase/firestore";
import { Toast } from "@/components/ui/toast";

export function useAuthWithGoogle() {
  const provider = new GoogleAuthProvider();
  const [isPanding, setIsPanding] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);

  const googleSignIn = async () => {
    setIsPanding(true);
    try {
      const res = await signInWithPopup(auth, provider);
      const user = res.user;
      // Add a new document in collection "cities"
      if (!isCanceled) {
        await setDoc(doc(db, "users", user.uid), {
          displayName: user.displayName,
          photoURL: user.photoURL,
          id: user.uid,
          online: true,
        })
          .then(() => {})
          .catch((error) => console.log(error));
      }
    } catch {
      // const errorCode = error.code;
      const errorMessage = error.message;
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    return () => setIsCanceled(true);
  }, []);

  return { googleSignIn, isPanding };
}
