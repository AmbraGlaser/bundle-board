// src/components/Header.jsx
import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Profile from "./Profile";
import Modal from "./Modal";
import BoardForm from "./BoardForm";
import { UserContext } from "../contexts/UserContext";

const Header = () => {
  const { user } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const navigate = useNavigate();

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

  const handleCreateBoard = () => {
    if (user) {
      setModalContent(<BoardForm onClose={() => setIsModalOpen(false)} />);
    } else {
      setModalContent(
        <div className="flex flex-col justify-center items-center">
          <p className="mb-4 text-purple dark:text-light-blue">
            You need to be logged in to create a board.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => navigate("/loginpage")}
              className="px-4 py-2 bg-light dark:bg-dark text-purple dark:text-light-blue rounded"
            >
              Login
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-light dark:bg-dark text-purple dark:text-light-blue rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      );
    }
    setIsModalOpen(true);
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
          <h1>
            <Link to="/aigeneration" className="text-purple font-Title">
              test
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
              className="font-Title text-purple dark:text-light-blue"
              onClick={handleCreateBoard}
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
            className="text-purple dark:text-light-blue"
            onClick={handleCreateBoard}
          >
            Maak een nieuw bord
          </button>
          <Profile />
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create a New Board"
      >
        {modalContent}
      </Modal>
    </header>
  );
};

export default Header;
