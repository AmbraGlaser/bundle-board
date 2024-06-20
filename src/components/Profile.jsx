import React from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    // Link naar de loginpagina
    <Link to="/loginpage">
      {/* Profielafbeelding */}
      <div className="relative w-10 h-10 overflow-hidden bg-light rounded-full dark:bg-dark">
        {/* Icon voor het profiel */}
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
    </Link>
  );
};

export default Profile;
