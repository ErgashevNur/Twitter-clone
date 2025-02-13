import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { IoSend } from "react-icons/io5";
import { v4 as uuidv4 } from "uuid";
import { Timestamp } from "firebase/firestore";
import { useCollection } from "@/hook/useCollection";
import { useFireStore } from "../hook/useFireStore";

function Project() {
  const location = useLocation();
  const proj = location.state || {};
  const { documents: projects } = useCollection("projects");
  let foundProject = null;

  const [content, setContent] = useState("");
  const { documents: user } = useCollection("users");
  const updateDocument = useFireStore("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const comment = {
      id: uuidv4(),
      content,
      createdAt: Timestamp.fromDate(new Date()),
      owner: {
        displayName: user.displayName,
        photoURL: user.photoURL,
        id: user.uid,
      },
    };
    setContent("");
    await updateDocument(foundProject.id, {
      comments: [...(foundProject.comments || []), comment],
    });
  };

  const prjct = location.state || {};
  if (!proj || !proj.id) {
    foundProject = projects?.find((project) => project.id === prjct) ?? null;
  }

  console.log(content);

  return (
    <div className="grid grid-cols-2 gap-5">
      <div className="card bg-gray-200 text-slate-950 w-[400px] h-[380px] shadow-custom dark:shadow-mode">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold">
            {foundProject?.name}
          </h2>
          <div className="flex items-center justify-between">
            <h3 className="text-lg italic font-extralight">
              {foundProject?.projectType}
            </h3>

            <h4>
              {new Date(foundProject?.dueTo.toDate()).toLocaleDateString()}
            </h4>
          </div>

          <hr className="bg-black text-black h-[2px]" />
          <p className="w-full p-2 text-black rounded-md mt-2 max-h-[125px] overflow-x-auto">
            {foundProject?.description}
          </p>
          <div className="card-actions flex justify-center gap-10">
            <div className="flex">
              <Button
                className="py-2 px-4 mt-4 border-black hover:text-white"
                type="button"
              >
                Completed Project
              </Button>
            </div>
            <div className="flex justify-end">
              <Button
                className="py-2 px-4 mt-4 border-black hover:text-white"
                type="button"
              >
                Delete Project
              </Button>
            </div>
          </div>

          <hr className="bg-black text-black h-[2px] mt-2" />

          <div className="text-right my-1">
            <p>{new Date(foundProject?.createdAt.toDate()).toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="max-h-[400px] overflow-x-auto">
        <h2 className="text-2xl">Chat for comments:</h2>
        {foundProject?.comments?.length === 0 ? (
          <h4 className="text-center my-10 italic opacity-50">
            No comments yet!
          </h4>
        ) : (
          foundProject?.comments.map((comment) => (
            <div
              key={comment.id}
              className={`chat ${
                user.uid === comment.owner.id ? "chat-end" : "chat-start"
              }`}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img alt="Commenter Avatar" src={comment.owner.photoURL} />
                </div>
              </div>
              <div className="chat-header">{comment.owner.displayName}</div>
              <div className="chat-bubble">{comment.content}</div>
              <div className="chat-footer opacity-50">
                <time className="text-xs opacity-90">
                  {new Date(comment.createdAt.toDate()).toLocaleTimeString()}
                </time>
              </div>
            </div>
          ))
        )}

        <form onSubmit={handleSubmit} className="mt-4">
          <label className="form-control">
            <textarea
              onChange={(e) => setContent(e.target.value)}
              value={content}
              className="textarea textarea-bordered dark:text-black text-base bg-white h-24"
              placeholder="Type here"
            ></textarea>
          </label>
          <button className="btn btn-neutral dark: mt-4 btn-block">
            Send <IoSend />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Project;
