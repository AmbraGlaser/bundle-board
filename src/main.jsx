import React from "react";
import ReactDOM from "react-dom/client"; // Importeer createRoot vanuit react-dom/client
import "./assets/index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Pagina's
import AppLayout from "./pages/AppLayout.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";

// Componenten
import Home from "./components/Home";
import LoginPage from "./components/LoginPage.jsx";
import DetailPage from "./components/DetailPage.jsx";
import AiGeneration from "./components/AiGeneration.jsx";
import ProfilePage from "./components/ProfilePage.jsx";

// Definieer de routes voor de applicatie
const routes = [
  {
    // Hoofdlay-out van de applicatie
    element: <AppLayout />,
    // Foutpagina voor weergave van fouten
    errorElement: <ErrorPage />,
    children: [
      {
        // Route voor de startpagina
        path: "/",
        element: <Home />,
      },
      {
        // Route voor de inlogpagina
        path: "/loginpage",
        element: <LoginPage />,
      },
      {
        path: "/detail/:id",
        element: <DetailPage />
      },
      {
        path: "/aigeneration",
        element: <AiGeneration />
      },
      {
        path: "/profilepage",
        element: <ProfilePage />
      },

      // Voeg hier meer routes toe indien nodig
    ],
  },
];

// Maak de browser router aan op basis van de gedefinieerde routes
const router = createBrowserRouter(routes);

// Render de applicatie in de root van de DOM
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
