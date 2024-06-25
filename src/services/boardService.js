// src/services/boardService.js
import { collection, addDoc } from "firebase/firestore";
import { db } from "./FirebaseConfig";

async function createBoard(userId, title) {
  const boardsRef = collection(db, "users", userId, "boards");

  const newBoard = {
    title: title,
    photos: []
  };

  await addDoc(boardsRef, newBoard);
}

export { createBoard };
