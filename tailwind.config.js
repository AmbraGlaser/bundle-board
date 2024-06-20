/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      Title: ["Orbitron", "sans-serif"],
      Secundair: ["Oswald", "sans-serif"]
    },
    colors: {
      dark: "#000501",
      light: "#E5E4E3",
      purple: "#7D84B2",
      "light-blue": "#BCF8EC",
    },
    dropShadow: {
      "light-blue": "0 10px 8px rgb(188, 248, 236)",
      purple: "0 10px 8px rgb(125, 132, 178)",
    },
    extend: {
      boxShadow: {
        "light-blue": "0 10px 8px rgb(188, 248, 236)",
        purple:
          "0 20px 25px -5px rgb(125, 132, 178), 0 8px 10px -6px rgb(125, 132, 178)",
      },
    },
  },
  plugins: [],
};
