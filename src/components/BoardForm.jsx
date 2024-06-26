// src/components/BoardForm.jsx
import React, { useState, useContext } from "react";
import { db, collection, addDoc } from "../services/FirebaseConfig";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const BoardForm = ({ onClose }) => {
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title) {
      setError("Title is required");
      return;
    }

    try {
      const boardRef = await addDoc(
        collection(db, "users", user.uid, "inspirationBoards"),
        {
          title,
          photos: [],
        }
      );
      onClose();
      navigate(`/boards/${boardRef.id}`);
    } catch (error) {
      setError("Error creating board: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <label className="mb-2 font-bold text-purple dark:text-light-blue">
        Board Title
      </label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 mb-4 border rounded"
        required
      />
      {error && <p className="text-red mb-4">{error}</p>}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-light dark:bg-dark text-white rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-light dark:bg-dark text-white rounded"
        >
          Create Board
        </button>
      </div>
    </form>
  );
};

export default BoardForm;
