import { useCollection } from "@/hook/useCollection";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function Home() {
  const { documents: projects } = useCollection("projects");

  function truncateText(text, wordLimit) {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  }

  return (
    <div className="w-[100%] pb-4 bg-cyan-900 dark:bg-gray-700">
      <ul className="flex flex-wrap gap-8 justify-center w-full max-w-[1200px]">
        {projects &&
          projects.map((doc) => {
            return (
              <li key={doc.id}>
                <div className="flex gap-4">
                  <div className="w-[250px] bg-cyan-900 dark:bg-gray-700 flex items-start pt-5 justify-center">
                    <Card>
                      <CardHeader>
                        <CardTitle>{doc.name}</CardTitle>
                        <CardDescription>
                          {truncateText(doc.description, 20)}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p>
                          {doc.dueTo
                            ? new Date(doc.dueTo).toLocaleDateString()
                            : "No due date"}
                        </p>
                      </CardContent>

                      <CardFooter>
                        <p>Shunaqa gaplar</p>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default Home;
