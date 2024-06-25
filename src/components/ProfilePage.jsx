// src/pages/ProfilePage.jsx
import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const ProfilePage = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="flex justify-center">
      <h1 className="text-2xl font-bold font-Title text-purple dark:text-light-blue">
        Welkom {user?.name || "Guest"}
      </h1>
    </div>
  );
};

export default ProfilePage;
