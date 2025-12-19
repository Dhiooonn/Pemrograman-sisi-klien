import { NavLink } from "react-router-dom";
import { useAuthStateContext } from "../../Auth/Context/AuthContext";

import {
  HomeIcon,
  AcademicCapIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";


const Sidebar = () => {
  const { user } = useAuthStateContext();

  const navClass = ({ isActive }) =>
    `flex items-center space-x-2 px-4 py-2 rounded ${
      isActive ? "bg-blue-700" : "hover:bg-blue-700"
    }`;

    const iconClass = "w-5 h-5 flex-shrink-0";
  // console.log("User sidebar: ", user); // Debugging

  return (
    <aside className="fixed top-0 left-0 z-40 bg-blue-800 text-white min-h-screen transition-all duration-300 w-20 lg:w-64">
      <div className="p-4 border-b border-blue-700">
        <h3 className="text-2xl font-bold hidden lg:block">Admin</h3>

        {/* ROLE USER */}
        <p className="text-sm text-blue-200 mt-1 hidden lg:block">
          Login sebagai: <strong className="capitalize">{user?.role}</strong>
        </p>
      </div>

      <nav className="p-4 space-y-2">
        {/* DASHBOARD */}
        {user?.permission?.includes("dashboard.page") && (
          <NavLink to="/admin/dashboard" className={navClass}>
            <HomeIcon className={iconClass}/>
            <p className="menu-text hidden lg:inline">Dashboard</p>
          </NavLink>
        )}

        {/* MAHASISWA */}
        {user?.permission?.includes("mahasiswa.page") && (
          <NavLink to="/admin/mahasiswa" className={navClass}>
            <AcademicCapIcon className={iconClass} />
            <p className="menu-text hidden lg:inline">Mahasiswa</p>
          </NavLink>
        )}

        {/* RENCANA STUDI */}
        {user?.permission?.includes("rencana-studi.page") && (
          <NavLink to="/admin/rencana-studi" className={navClass}>
            <BookOpenIcon className={iconClass} />
            <span className="menu-text hidden lg:inline">Rencana Studi</span>
          </NavLink>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;