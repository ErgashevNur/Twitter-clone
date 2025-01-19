import { toast } from "sonner";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useSelector } from "react-redux";
import { FaRegFaceSmileBeam } from "react-icons/fa6";

export function useLogout() {
  const { user } = useSelector((store) => store.user);

  const logout = async () => {
    let ref = doc(db, "users", user.uid);
    await updateDoc(ref, {
      online: false,
    });
    signOut(auth)
      .then(() => {
        toast.success(`See you again ${(<FaRegFaceSmileBeam />)}`);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return { logout };
}
