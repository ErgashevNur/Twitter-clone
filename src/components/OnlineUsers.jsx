import { useCollection } from "../hook/useCollection";

function OnlineUsers() {
  const { documents: users } = useCollection("users");

  return (
    <div className="w-[200px] bg-cyan-900 dark:bg-gray-700">
      <ul>
        {users &&
          users.map((doc) => {
            return (
              <li key={doc.id}>
                <div className="flex gap-4">
                  <div className="w-[250px] bg-cyan-900 dark:bg-gray-700 flex items-start pt-5 justify-center">
                    <div
                      className={`avatar ${doc.online ? "online" : "offline"}`}
                    >
                      <div className="w-24 rounded-full ring-primary border-sky-600 ring ring-offset-2">
                        <img src={doc.photoURL} />
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default OnlineUsers;
