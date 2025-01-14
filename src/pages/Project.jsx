import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";

function Project() {
  const location = useLocation();
  const proj = location.state;

  console.log("project", proj);

  return (
    <div className="grid grid-cols-2 gap-5">
      <div className="card bg-gray-200  text-slate-950 w-[400px] h-[350px]  ">
        <div className="card-body ">
          <h2 className="card-title  text-2xl"> {proj.name}</h2>
          <h3 className="text-x italic font-extralight">{proj.projectType}</h3>
          <hr className="bg-black text-black h-[2px]" />

          <p className="w-full p-2 text-black rounded-md mt-2 max-h-[125px] overflow-x-auto ">
            {proj.description}
          </p>
          {/*BUTTONS */}
          <div className="card-actions flex  justify-center gap-10">
            <div className="flex ">
              <Button
                className="py-2 px-4 mt-4 border-black hover:text-white"
                type="button"
                onClick={() => updateDocument(proj.id)}
              >
                Completed Project
              </Button>
            </div>

            <div className="flex justify-end">
              <Button
                className="py-2 px-4 mt-4 border-black hover:text-white"
                type="button"
                onClick={() => deleteDocumen(id)}
              >
                Delete Project
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="max-h-[400px] overflow-x-auto">
        <h2 className="text-2xl ">Chat for comments:</h2>
        {proj.comments.length == 0 ? (
          <h4 className="text-center my-10 italic opacity-50">
            No comments yet!
          </h4>
        ) : (
          <>
            {proj.comments.map((comment) => {
              return (
                <div
                  key={proj.id}
                  className={`chat ${
                    user.uid == comment.owner.id ? "chat-end" : "chat-start"
                  }`}
                >
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS chat bubble component"
                        src={comment.owner.photoURL}
                      />
                    </div>
                  </div>
                  <div className="chat-header">{comment.owner.displayName}</div>
                  <div className="chat-bubble">{comment.content}</div>
                  <div className="chat-footer opacity-50">
                    <time className="text-xs opacity-90">
                      {new Date(
                        comment.createdAt.toDate()
                      ).toLocaleTimeString()}
                    </time>
                  </div>
                </div>
              );
            })}
          </>
        )}

        <div>
          <form onSubmit={handleSubmit}>
            <label className="form-control">
              <textarea
                onChange={(e) => setContent(e.target.value)}
                value={content}
                className="textarea textarea-bordered h-24"
                placeholder="Type here"
              ></textarea>
            </label>
            <button className="btn btn-neutral mt-2 btn-block">
              Send
              <VscSend />
            </button>
          </form>
        </div>
      </div> */}
    </div>
  );
}

export default Project;
