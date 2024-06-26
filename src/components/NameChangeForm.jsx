// src/components/NameChangeForm.jsx
import React, { useState, useContext } from "react";
import { db, doc, updateDoc } from "../services/FirebaseConfig";
import { UserContext } from "../contexts/UserContext";

const NameChangeForm = ({ onClose, currentName }) => {
  const { user, setUser } = useContext(UserContext);
  const [newName, setNewName] = useState(currentName);
  const [error, setError] = useState("");

  const handleNameChange = async (e) => {
    e.preventDefault();
    if (user) {
      try {
        const userDocRef = doc(db, "users", user.uid);
        await updateDoc(userDocRef, { name: newName });
        setUser({ ...user, displayName: newName });
        onClose();
      } catch (error) {
        setError("Error updating name: " + error.message);
      }
    }
  };

  return (
    <form onSubmit={handleNameChange} className="flex flex-col">
      <label className="mb-2 font-bold text-purple dark:text-light-blue">
        New Name
      </label>
      <input
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        className="p-2 mb-4 border rounded"
        required
      />
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-500 text-purple dark:text-light-blue rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-purple dark:text-light-blue rounded"
        >
          Update Name
        </button>
      </div>
    </form>
  );
};

export default NameChangeForm;
