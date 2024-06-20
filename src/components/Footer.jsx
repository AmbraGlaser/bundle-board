import React, { useState, useEffect } from "react";

const Footer = () => {
  // State om de huidige kleurmodus (licht/donker) bij te houden
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

  // Functie om tussen lichte en donkere modus te schakelen
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
      document.documentElement.classList.add("dark-mode");
      document.getElementById('root').classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
      document.documentElement.classList.remove("dark-mode");
      document.getElementById('root').classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  return (
    // Footer sectie met dynamische achtergrondkleur en iconen voor lichte/donkere modus
    <footer
      className={`fixed bottom-0 left-0 z-20 w-full bg-light dark:bg-dark p-4 border-t border-purple dark:border-light-blue shadow flex items-center justify-between ${isDarkMode
        ? "bg-dark dark:bg-gray-800 dark:border-gray-600"
        : "bg-white"
        }`}
    >
      {/* Tekst met het jaartal en merknaam */}
      <span
        className={`text-sm ${isDarkMode ? "dark:text-light-blue" : "text-purple"
          } sm:text-center font-Secundair`}
      >
        © 2024 Bundle Board™
      </span>
      {/* Knop om tussen lichte en donkere modus te schakelen */}
      <div onClick={toggleDarkMode} className="cursor-pointer">
        {isDarkMode ? (
          // Afbeelding voor donkere modus
          <img
            src="https://img.icons8.com/?size=45&id=26031&format=png&color=FFFFFF"
            alt="moon"
            className="w-6 h-6"
            id="moon"
          />
        ) : (
          // Afbeelding voor lichte modus
          <img
            src="https://img.icons8.com/?size=45&id=6Z2mGj6qDVv4&format=png&color=000000"
            alt="sun"
            className="w-6 h-6"
            id="sun"
          />
        )}
      </div>
    </footer>
  );
};

export default Footer;
