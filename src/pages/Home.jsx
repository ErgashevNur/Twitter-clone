import { useCollection } from "@/hook/useCollection";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Home() {
  const { documents: projects } = useCollection("projects");
  const { documents: users } = useCollection("users");
  const [selectData, setSelectData] = useState({});

  function truncateText(text, wordLimit) {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  }

  const navigate = useNavigate();

  // if (projects && Array.isArray(projects) && users && Array.isArray(users)) {
  //   const user = users.find((user) => user.id == projects.assignedUsers);

  //   if (user) {
  //     arr.push(user.displayName);
  //   } else {
  //     console.log(`${projects.assignedUsers}`);
  //   }
  // } else {
  //   console.log("Projects or Users array is null or undefined");
  // }

  console.log(projects);

  return (
    <div className="w-[100%] px-6 p-4 bg-cyan-900 dark:bg-gray-700 rounded-lg">
      <ul className="flex flex-wrap gap-5 justify-strat w-full max-w-[1200px]">
        {projects &&
          projects.map((doc) => {
            return (
              <li key={doc.id} className="w-72 h-70 rounded-t-lg rounded-lg ">
                <button
                  onClick={() => {
                    navigate(`/project/${doc.id}`, { state: doc.id });
                  }}
                >
                  <div className="flex gap-4">
                    <div className="w-full h-full bg-cyan-900 dark:bg-gray-700 flex items-start justify-center">
                      <Card>
                        <CardHeader>
                          <CardTitle className="w-full">{doc.name}</CardTitle>
                          <CardDescription className="w-full">
                            {truncateText(doc.description, 10)}.
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="w-full">
                            {new Date(doc.dueTo.toDate()).toLocaleDateString()}
                          </p>
                          <p className="mx-auto">{doc.projectType}</p>
                        </CardContent>

                        <hr className="w-full h-1" />

                        <div className="flex p-2 items-center">
                          <img
                            className="rounded-full w-16"
                            src={doc.assignedUsers.value.photoURL}
                            alt=""
                          />

                          <h4 className="ml-5 text-lg font-bold">
                            {doc.assignedUsers.label}
                          </h4>
                        </div>
                      </Card>
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default Home;
