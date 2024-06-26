import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";

// Pagina's en componenten
import AppLayout from "./pages/AppLayout.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import ProfilePage from "./components/ProfilePage.jsx";
import Home from "./components/Home";
import LoginPage from "./components/LoginPage.jsx";
import DetailPage from "./components/DetailPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import DetailBoards from "./components/DetailBoards.jsx";

const routes = [
  {
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/loginpage", element: <LoginPage /> },
      { path: "/detail/:id", element: <DetailPage /> },
      {
        path: "/profilepage",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/boards/:boardId",
        element: <DetailBoards />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserProvider>
    <RouterProvider router={router} />
  </UserProvider>
);
