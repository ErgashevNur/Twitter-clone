import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { useDispatch } from "react-redux";
import { login, setIsPending } from "../app/features/userSlice";
import { toast } from "react-toastify";
import { doc, setDoc } from "firebase/firestore";

export function useLogin() {
  const dispatch = useDispatch();
  const loginWithEmailAndPassword = async (email, password) => {
    dispatch(setIsPending(true));
    try {
      let res = await signInWithEmailAndPassword(auth, email, password);

      if (!res) {
        throw new Error("Failed to sign in. Please try");
      }

      await setDoc(doc(db, "users", res.user.uid), {
        displayName: res.user.displayName,
        photoURL: res.user.photoURL,
        id: res.user.uid,
        online: true,
      });
      dispatch(login(res.user));
      dispatch(setIsPending(false));
      toast.success(`Welcome back, ${res.user.displayName}`);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return { loginWithEmailAndPassword };
}
