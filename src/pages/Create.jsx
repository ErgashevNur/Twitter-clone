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
import { validate } from "uuid";

export async function action({ request }) {
  const form = await request.formData();
  const name = form.get("name");
  const description = form.get("description");
  const dueTo = Timestamp.fromDate(new Date(form.get("dueTo")));
  return { name, description, dueTo };
}

function Create() {
  const [desc, setDesc] = useState("");
  const [users, setUsers] = useState([]);
  const [assignedUsers, setAssignedUser] = useState([]);
  const [projectType, setProjectType] = useState([]);
  const navigate = useNavigate();
  const { addDocument, isPanding } = useFireStore("projects");
  const { documents } = useCollection("users");
  const createActionData = useActionData();

  useEffect(() => {
    setUsers(
      documents?.map((document) => {
        return { value: { ...document }, label: document.displayName };
      })
    );
  }, [documents]);

  function validate() {
    if (desc.length < 10) {
      alert("DESCRIPTION 10TA SO'ZDAN KAM BOLMASLIGI KERAK");
      return false;
    }
    return true;
  }

  const isValid = validate;

  if (!isValid) {
    return;
  }

  const selectUser = (userId) => {
    const selectedUser = users.find((user) => user.value.id === userId);
    setAssignedUser(selectedUser);
  };

  const selectProjectType = (type) => {
    setProjectType(type);
  };

  useEffect(() => {
    if (createActionData) {
      addDocument({
        ...createActionData,
        comments: [],
        assignedUsers,
        projectType,
        createdAt: serverTimestamp(new Date()),
      }).then(() => {
        navigate("/");
      });
    }
  }, [createActionData]);

  console.log(assignedUsers);

  return (
    <div className="flex flex-col items-center px-5">
      <h2 className="text-3xl font-semibold dark:text-gray-300 text-black mb-10 text-center">
        {" "}
        Create a new project
      </h2>
      <Form
        method="post"
        className="flex flex-col gap-5 max-w-[700px] w-full justify-center p-6 shadow-lg rounded-lg border border-gray-700"
      >
        <FormInput
          label="Project name"
          type="text"
          placeholder="Write project name here."
          name="name"
        />
        <FormTextare
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          label="Project descripton"
          name="description"
        />

        <FormInput label="Due to" type="date" name="dueTo" />

        <label className="form-control">
          <div className="label">
            <span className="label-text">Project Types</span>
          </div>
          <Select onValueChange={selectProjectType}>
            <SelectTrigger className="w-[180px] bg-slate-400 dark:bg-gray-700">
              <SelectValue placeholder="Select Directions" />
            </SelectTrigger>
            <SelectContent className="bg-slate-400 dark:bg-gray-700">
              <SelectGroup>
                <SelectLabel className="flex items-center gap-2">
                  Select Directions <FaArrowDown />
                </SelectLabel>
                <SelectItem value="frontend">FrontEnd</SelectItem>
                <SelectItem value="backend">BackEnd</SelectItem>
                <SelectItem value="fullstack">FullStack</SelectItem>
                <SelectItem value="graphic-design">Graphic Design</SelectItem>
                <SelectItem value="cyber-security">Cyber Security</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </label>
        <label className="form-control">
          <div className="label">
            <span className="label-text">Assigned Users</span>
          </div>

          <Select onValueChange={selectUser}>
            <SelectTrigger className="w-[180px] bg-slate-400 dark:bg-gray-700">
              <SelectValue placeholder="Select Directions" />
            </SelectTrigger>

            <SelectContent>
              {users && users.length > 0 ? (
                users.map((user, index) => (
                  <SelectItem key={user.value.id} value={user.value.id}>
                    {user.label}
                  </SelectItem>
                ))
              ) : (
                <div>No users available</div>
              )}
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
            <Button className="btn bg-gray-700 text-gray-200 hover:text-gray-800">
              Add project
            </Button>
          </div>
        )}
      </Form>
    </div>
  );
}

export default Create;
