import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { v4 as uuid } from "uuid";

import { useDispatch } from "react-redux";
import { login } from "../app/features/userSlice";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

export function useRegister() {
  const dispatch = useDispatch();
  const registerWithEmailAndPassword = async (displayName, email, password) => {
    try {
      let res = await createUserWithEmailAndPassword(auth, email, password);
      if (!res) {
        return <h2>Failed to sign in. Please try</h2>;
      }

      await updateProfile(auth.currentUser, {
        displayName: displayName,
        photoURL: "https://api.dicebear.com/9.x/adventurer/svg?seed=" + uuid(),
      });

      // Add a new document in collection "cities"
      await setDoc(doc(db, "users", res.user.uid), {
        displayName: res.user.displayName,
        photoURL: res.user.photoURL,
        id: res.user.uid,
        online: true,
      });
      dispatch(login(res.user));
    } catch (error) {
      toast.error(error.message);
    }
  };
  return { registerWithEmailAndPassword };
}
