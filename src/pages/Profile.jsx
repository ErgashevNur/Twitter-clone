import React, { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { useSelector } from "react-redux";

function Profile() {
  const { user } = useSelector((store) => store.user);
  const fileInputRef = useRef(null);
  const [backgroundImage, setBackgroundImage] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setBackgroundImage(`url(${url})`);
      setProfileImage(url);
    }
  };

  console.log(user);

  return (
    <>
      <div
        id="accountbg"
        className="relative w-400px] min-h-80 bg-no-repeat bg-cover bg-gray-600 rounded-lg"
        style={{ backgroundImage: backgroundImage }}
      >
        <Input
          type="file"
          ref={fileInputRef}
          className="opacity-0 cursor-pointer absolute w-full h-[200px] bg-cover bg-center"
          onChange={handleImageChange}
        >
          Drop your background image
        </Input>

        <div className="absolute top-[220px] left-28 transform -translate-x-1/2 w-[150px] h-[150px] bg-blue-400 rounded-full overflow-hidden border-4 border-white shadow-md">
          <img
            src={user.photoURL}
            className="w-full h-full items-center flex justify-center"
          />
        </div>
      </div>

      <div className="mt-[70px] p-4 text-center">
        <button className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">
          Edit Profile
        </button>
        <div className="p-4 border rounded shadow-md w-80">
          <Input disabled type="email" placeholder={user.displayName} />
          <br />
          <Input disabled type="email" placeholder={user.email} />
        </div>
      </div>
    </>
  );
}

export default Profile;
