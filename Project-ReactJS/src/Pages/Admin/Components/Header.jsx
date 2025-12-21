import {
  confirmLogout,
} from "@/Utils/Helpers/SwalHelpers";
import { useNavigate } from "react-router-dom";

import { useAuthStateContext } from "../../Auth/Context/AuthContext";

import {
  ArrowRightOnRectangleIcon
} from "@heroicons/react/24/outline";

const Header = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthStateContext();

  const toggleProfileMenu = () => {
    const menu = document.getElementById("profileMenu");
    if (menu) menu.classList.toggle("hidden");
  };

  const handleLogout = () => {
    confirmLogout(() => {
      // localStorage.removeItem("user");
      setUser(null);
      navigate("/", { replace: true });
    });
  }

  return (
    <header className="fixed top-0 left-0 right-0 ml-64 z-50 bg-white shadow-md ">
      <div className="flex justify-between items-center px-6 py-4">
        <h1 className="text-2xl font-semibold text-gray-800">Mahasiswa</h1>
        <div className="relative">
          <button
            onClick={toggleProfileMenu}
            className="
              w-10 h-10 rounded-full 
              bg-red-500 
              flex items-center justify-center
              hover:bg-red-600
              focus:outline-none cursor-pointer
            "
          >
            <ArrowRightOnRectangleIcon className="h-5 text-white" />
          </button>

          <div
            id="profileMenu"
            className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-2 hidden"
          >
            <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              Profile
            </a>
            <button
              onClick={() => {
                handleLogout();
              }}
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;