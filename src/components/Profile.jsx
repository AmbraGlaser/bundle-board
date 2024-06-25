import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { auth } from "../services/FirebaseConfig";

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUser(null);
      navigate("/loginpage");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <div className="relative">
      <div onClick={() => setShowMenu(!showMenu)} className="cursor-pointer">
        <div className="relative w-10 h-10 overflow-hidden bg-light rounded-full dark:bg-dark">
          <svg
            className="absolute w-12 h-12 font-Secundair text-purple -left-1 dark:text-light-blue"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
      </div>
      {showMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-light dark:bg-dark border border-gray-200 dark:border-light rounded-lg shadow-lg z-50">
          <div className="px-4 py-2">
            <p className="text-purple dark:text-light-blue">
              Hello, {user ? user.name : "Guest"}
            </p>
          </div>
          <div className="border-t border-gray-200 dark:border-dark"></div>
          <div className="px-4 py-2">
            <Link
              to="/profilepage"
              className="block text-purple dark:text-light-blue hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2 rounded-lg"
            >
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="block w-full text-left text-purple dark:text-light-blue hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
