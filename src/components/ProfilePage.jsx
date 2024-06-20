// src/pages/ProfilePage.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';

const ProfilePage = () => {
    const location = useLocation();
    const { user } = location.state || { user: { name: 'Guest' } }; // Standaardwaarde voor het geval er geen gebruikersgegevens zijn doorgegeven

    return (
        <div className="flex justify-center">
            <h1 className="text-2xl font-bold font-Title text-purple dark:text-light-blue">
                Welkom {user.name}
            </h1>
        </div>
    );
};

export default ProfilePage;
