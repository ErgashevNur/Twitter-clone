import { NavLink } from "react-router-dom";
import Avatar from "./Avatar";
import { useSelector } from "react-redux";
import { useLogout } from "../hook/useLogout";
import { FaPlus, FaClipboardList } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import { ThemeProvider } from "./theme-provider";

function Sidebar() {
  const { logout } = useLogout();
  const { user } = useSelector((store) => store.user);

  return (
    <div className="dark:bg-violet-700 bg-cyan-600 min-h-screen w-[350px] text-white flex flex-col">
      <Avatar user={user} />
      <ul className="text-black flex flex-col pr-0 pl-10 mb-auto mt-20">
        <li className="nav-item hover:bg-cyan-700 dark:hover:bg-violet-800 hover:rounded-s-3xl active:border active:border-white">
          <NavLink
            to="/"
            className="flex items-center px-3 py-2 rounded-l-3xl gap-2"
          >
            <FaClipboardList />
            Project
          </NavLink>
        </li>

        <li className="nav-item hover:bg-cyan-700 dark:hover:bg-violet-800 hover:rounded-s-3xl active:border active:border-white">
          <NavLink
            to="/create"
            className="flex items-center px-3 py-2 rounded-l-3xl gap-2"
          >
            <FaPlus />
            Create
          </NavLink>
        </li>

        <li className="nav-item hover:bg-cyan-700 dark:hover:bg-violet-800 hover:rounded-s-3xl active:border active:border-white">
          <NavLink
            to="/profile"
            className="flex items-center px-3 py-2 rounded-l-3xl gap-2"
          >
            <MdAccountCircle />
            Profile
          </NavLink>
        </li>
      </ul>

      <div className="mb-10 flex items-center gap-3 flex-col">
        <ThemeProvider
          defaultTheme="dark"
          storageKey="vite-ui-theme"
          className="px-8"
        >
          <ModeToggle />
        </ThemeProvider>

        <Button onClick={logout}>
          <TbLogout2 />
          Log Out
        </Button>
      </div>
    </div>
  );
}

export default Sidebar;
