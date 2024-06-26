import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Profile from "./Profile";
import BoardForm from "./BoardForm";
import Modal from "./Modal";
import { UserContext } from "../contexts/UserContext";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  const [showBoardForm, setShowBoardForm] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => setIsDarkMode(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  useEffect(() => {
    setShowBoardForm(false);
    setShowLoginPrompt(false);
    setMenuOpen(false); // Close the menu when the route changes
  }, [location]);

  const handleCreateBoard = () => {
    if (user) {
      setShowBoardForm(true);
    } else {
      setShowLoginPrompt(true);
    }
  };

  return (
    <header className="relative bg-light dark:bg-dark p-4 drop-shadow-purple dark:drop-shadow-light-blue">
      <div className="flex justify-between items-center">
        <div className="flex flex-row items-center gap-5">
          <h1>
            <Link
              to="/"
              className="font-Title text-purple dark:text-light-blue text-2xl"
            >
              BundleBoard
            </Link>
          </h1>
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-purple dark:text-light-blue"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
        <div className="hidden md:flex md:items-center md:justify-between md:w-full">
          <div className="flex-grow max-w-md mx-auto"></div>
          <div className="flex gap-5 items-center">
            <button
              onClick={handleCreateBoard}
              className="font-Title text-purple dark:text-light-blue"
            >
              Maak een nieuw bord
            </button>
            <Profile />
          </div>
        </div>
      </div>
      <div
        className={`absolute top-full left-0 w-full bg-light dark:bg-dark p-4 border-t border-gray-200 shadow-lg md:hidden ${
          menuOpen ? "flex flex-col items-center" : "hidden"
        }`}
      >
        <div className="flex flex-col items-center gap-5 w-full">
          <button
            onClick={handleCreateBoard}
            className="text-purple dark:text-light-blue"
          >
            Make a new board
          </button>
          <Profile />
        </div>
      </div>

      <Modal
        isOpen={showBoardForm}
        onClose={() => setShowBoardForm(false)}
        title="Create New Board"
      >
        <BoardForm onClose={() => setShowBoardForm(false)} />
      </Modal>

      <Modal
        isOpen={showLoginPrompt}
        onClose={() => setShowLoginPrompt(false)}
        title="Login Required"
      >
        <div className="flex flex-col items-center">
          <p className="mb-4">You need to log in to create a new board.</p>
          <button
            onClick={() => {
              setShowLoginPrompt(false);
              navigate("/loginpage");
            }}
            className="px-4 py-2 bg-purple dark:bg-light-blue text-white rounded"
          >
            Login
          </button>
          <button
            onClick={() => setShowLoginPrompt(false)}
            className="mt-2 px-4 py-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </header>
  );
};

export default Header;
