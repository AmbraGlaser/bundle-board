// src/components/AddToBoardPopup.jsx
import React, { useState, useEffect } from "react";
import { getDocs, collection, addDoc } from "firebase/firestore";
import { db } from "../services/FirebaseConfig";

const AddToBoardPopup = ({ userId, photo, onClose }) => {
  const [boards, setBoards] = useState([]);
  const [newBoardTitle, setNewBoardTitle] = useState("");
  const [selectedBoard, setSelectedBoard] = useState("");

  useEffect(() => {
    const fetchBoards = async () => {
      const boardsRef = collection(db, "users", userId, "boards");
      const boardsSnapshot = await getDocs(boardsRef);
      const boardsList = boardsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBoards(boardsList);
    };

    fetchBoards();
  }, [userId]);

  const handleCreateBoard = async () => {
    const boardsRef = collection(db, "users", userId, "boards");
    const newBoard = {
      title: newBoardTitle,
      photos: [photo],
    };
    await addDoc(boardsRef, newBoard);
    onClose();
  };

  const handleAddPhoto = async () => {
    const boardRef = doc(db, "users", userId, "boards", selectedBoard);
    await updateDoc(boardRef, {
      photos: arrayUnion(photo),
    });
    onClose();
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Add Photo to Board</h2>
        <div>
          <h3>Select an existing board:</h3>
          <select
            onChange={(e) => setSelectedBoard(e.target.value)}
            value={selectedBoard}
          >
            <option value="">Select a board</option>
            {boards.map((board) => (
              <option key={board.id} value={board.id}>
                {board.title}
              </option>
            ))}
          </select>
          <button onClick={handleAddPhoto} disabled={!selectedBoard}>
            Add to Selected Board
          </button>
        </div>
        <div>
          <h3>Or create a new board:</h3>
          <input
            type="text"
            placeholder="New Board Title"
            value={newBoardTitle}
            onChange={(e) => setNewBoardTitle(e.target.value)}
          />
          <button onClick={handleCreateBoard} disabled={!newBoardTitle}>
            Create and Add
          </button>
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default AddToBoardPopup;
