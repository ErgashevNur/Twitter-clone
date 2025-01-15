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

function Home() {
  const { documents: projects } = useCollection("projects");

  function truncateText(text, wordLimit) {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  }

  const navigate = useNavigate();

  return (
    <div className="w-[100%] px-6 p-4 bg-cyan-900 dark:bg-gray-700 rounded-lg">
      <ul className="flex flex-wrap gap-8 justify-strat w-full max-w-[1200px]">
        {projects &&
          projects.map((doc) => {
            return (
              <li
                key={doc.id}
                className="w-[250px] h-full rounded-t-lg rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => {
                    navigate(`/project/${doc.id}`, { state: doc });
                  }}
                >
                  {/* <Link to="project/:id"> */}
                  <div className="flex gap-4">
                    <div className="w-[200px] bg-cyan-900 dark:bg-gray-700 flex items-start justify-center">
                      <Card>
                        <CardHeader>
                          <CardTitle>{doc.name}</CardTitle>
                          <CardDescription>
                            {truncateText(doc.description, 10)}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p>
                            {new Date(doc.dueTo.toDate()).toLocaleDateString()}
                          </p>
                        </CardContent>

                        <CardFooter>
                          <p>Shunaqa gaplar</p>
                        </CardFooter>
                      </Card>
                    </div>
                  </div>
                </button>
                {/* </Link> */}
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default Home;
