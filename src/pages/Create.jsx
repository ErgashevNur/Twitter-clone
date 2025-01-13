import FormTextare from "../components/FormTextarea";
import FormInput from "../components/FormInput";
import { Form, useActionData, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Timestamp } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import { useFireStore } from "../hook/useFireStore";
import { useCollection } from "../hook/useCollection";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaArrowDown } from "react-icons/fa";

export async function action({ request }) {
  const form = await request.formData();
  const name = form.get("name");
  const description = form.get("description");
  const dueTo = Timestamp.fromDate(new Date(form.get("dueTo")));
  return { name, description, dueTo };
}

function Create() {
  const navigate = useNavigate();
  const { addDocument, isPanding } = useFireStore("projects");
  const { documents } = useCollection("users");
  const createActionData = useActionData();
  const [assignedUsers, setAssignedUser] = useState([]);
  const [projectType, setProjectType] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(
      documents?.map((document) => {
        return { value: { ...document }, label: document.displayName };
      })
    );
  }, [documents]);

  const selectUser = (user) => {
    setAssignedUser(user);
  };
  const selectProjectType = (type) => {
    setProjectType(type.value);
  };

  useEffect(() => {
    if (createActionData) {
      addDocument({
        ...createActionData,
        assignedUsers: assignedUsers.map((au) => au.value),
        projectType,
        createdAt: serverTimestamp(new Date()),
      }).then(() => {
        navigate("/");
      });
    }
  }, [createActionData]);

  console.log();

  return (
    <div className="flex flex-col items-center px-5">
      <h2 className="text-3xl font-semibold dark:text-gray-300 text-black mb-10 text-center">
        {" "}
        Create a new project
      </h2>
      <Form
        method="post"
        className="flex flex-col gap-7 max-w-[700px] w-full justify-center p-10 shadow-lg rounded-lg border border-gray-700"
      >
        <FormInput
          label="Project name"
          type="text"
          placeholder="Write project name here."
          name="name"
        />
        <FormTextare label="Project descripton" name="description" />

        <FormInput label="Due to" type="date" name="dueTo" />

        <label className="form-control">
          <div className="label">
            <span className="label-text">Project Types</span>
          </div>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Directions" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className="flex items-center gap-2">
                  Select Directions <FaArrowDown />
                </SelectLabel>
                <SelectItem value="frontend">FrontEnd</SelectItem>
                <SelectItem value="backend">BackEnd</SelectItem>
                <SelectItem value="fullstack">FullStack</SelectItem>
                <SelectItem value="graphic-design">Graphic Design</SelectItem>
                <SelectItem value="Cyber-​ecurity">Cyber-​security</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </label>
        <label className="form-control">
          <div className="label">
            <span className="label-text">Assigned Users</span>
          </div>

          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Directions" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup options="users"></SelectGroup>
            </SelectContent>
          </Select>
        </label>
        {isPanding && (
          <div className="flex justify-end">
            <Button className="btn btn-outline btn-success" disabled>
              Loading...
            </Button>
          </div>
        )}
        {!isPanding && (
          <div className="flex justify-end">
            <Button className="btn btn-outline btn-success">Add project</Button>
          </div>
        )}
      </Form>
    </div>
  );
}

export default Create;
