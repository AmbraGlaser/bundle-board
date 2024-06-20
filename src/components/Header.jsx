import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Profile from "./Profile";

const Header = () => {
  // State voor het openen/sluiten van het mobiele menu
  const [menuOpen, setMenuOpen] = useState(false);

  // State voor het detecteren van de huidige kleurmodus (licht/donker)
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  // Effect om de kleurmodus bij te werken wanneer de gebruiker de systeemvoorkeur verandert
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => setIsDarkMode(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Effect om de HTML-elementen bij te werken wanneer de kleurmodus verandert
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    // Header sectie met logo, navigatie en mobiel menu
    <header className="relative bg-light dark:bg-dark p-4 drop-shadow-purple dark:drop-shadow-light-blue">
      <div className="flex justify-between items-center">
        {/* Logo met link naar de homepagina */}
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
        {/* Mobiel menu icoon */}
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
        {/* Desktop navigatie */}
        <div className="hidden md:flex md:items-center md:justify-between md:w-full">
          <div className="flex-grow max-w-md mx-auto"></div>
          <div className="flex gap-5 items-center">
            {/* Knop voor het maken van een nieuw bord */}
            <button className="font-Title text-purple dark:text-light-blue">
              Maak een nieuw bord
            </button>
            {/* Profielcomponent */}
            <Profile />
          </div>
        </div>
      </div>
      {/* Mobiel menu */}
      <div
        className={`absolute top-full left-0 w-full bg-light dark:bg-dark p-4 border-t border-gray-200 shadow-lg md:hidden ${menuOpen ? "flex flex-col items-center" : "hidden"
          }`}
      >
        <div className="flex flex-col items-center gap-5 w-full">
          {/* Knop voor het maken van een nieuw bord */}
          <button className="text-purple dark:text-light-blue">
            Maak een nieuw bord
          </button>
          {/* Profielcomponent */}
          <Profile />
        </div>
      </div>
    </header>
  );
};

export default Header;
