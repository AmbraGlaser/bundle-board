// src/components/DetailBoards.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  db,
  doc,
  getDoc,
  updateDoc,
  arrayRemove,
} from "../services/FirebaseConfig";
import { UserContext } from "../contexts/UserContext";

const DetailBoards = () => {
  const { boardId } = useParams();
  const { user } = useContext(UserContext);
  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    console.log("User in DetailBoards:", user);
    console.log("boardId in DetailBoards:", boardId);

    const fetchBoard = async () => {
      if (!user || !user.uid || !boardId) {
        console.log("No user logged in, user.uid, or boardId is undefined");
        setLoading(false);
        return;
      }

      try {
        const boardDoc = await getDoc(
          doc(db, "users", user.uid, "inspirationBoards", boardId)
        );
        if (boardDoc.exists()) {
          setBoard(boardDoc.data());
        } else {
          console.log("No such board document!");
        }
      } catch (error) {
        console.error("Error fetching board: ", error);
      }
      setLoading(false);
    };

    fetchBoard();
  }, [boardId, user]);

  const handleDeletePhoto = async (photo) => {
    if (!user || !user.uid || !boardId) {
      console.log("No user logged in, user.uid, or boardId is undefined");
      return;
    }

    try {
      await updateDoc(
        doc(db, "users", user.uid, "inspirationBoards", boardId),
        {
          photos: arrayRemove(photo),
        }
      );
      setBoard((prevBoard) => ({
        ...prevBoard,
        photos: prevBoard.photos.filter((p) => p.photoUrl !== photo.photoUrl),
      }));
    } catch (error) {
      console.error("Error deleting photo: ", error);
    }
  };

  // Example of how to detect dark mode
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(mediaQuery.matches);
    const handleChange = () => setIsDarkMode(mediaQuery.matches);
    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!board) {
    return <div>No board found</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold text-purple dark:text-light-blue">
        {board.title}
      </h1>
      <div className="flex flex-wrap justify-center gap-4 m-3 border-purple dark:border-light-blue border-2 p-2">
        {board.photos && board.photos.length > 0 ? (
          board.photos.map((photo, index) => (
            <div key={index} className="relative group">
              <img
                src={photo.photoUrl}
                alt={photo.description}
                className="w-96 h-96 object-cover rounded"
              />
              <button
                onClick={() => handleDeletePhoto(photo)}
                className="absolute top-2 right-2 p-1 bg-white dark:bg-gray-800 rounded-full opacity-75 group-hover:opacity-100 transition-opacity"
              >
                {isDarkMode ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-current text-light-blue"
                  >
                    <path d="M9 3h6v2H9zM5 6h14v2H5zm2 2h10v13H7zm3 1h2v11h-2zm-1 0h2v11H9zm6 0h2v11h-2zm-1 0h2v11h-2z"></path>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-current text-purple"
                  >
                    <path d="M10,2l-1,1h-4c-0.6,0 -1,0.4 -1,1c0,0.6 0.4,1 1,1h2h10h2c0.6,0 1,-0.4 1,-1c0,-0.6 -0.4,-1 -1,-1h-4l-1,-1zM5,7v13c0,1.1 0.9,2 2,2h10c1.1,0 2,-0.9 2,-2v-13zM9,9c0.6,0 1,0.4 1,1v9c0,0.6 -0.4,1 -1,1c-0.6,0 -1,-0.4 -1,-1v-9c0,-0.6 0.4,-1 1,-1zM15,9c0.6,0 1,0.4 1,1v9c0,0.6 -0.4,1 -1,1c-0.6,0 -1,-0.4 -1,-1v-9c0,-0.6 0.4,-1 1,-1z"></path>
                  </svg>
                )}
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No photos</p>
        )}
      </div>
    </div>
  );
};

export default DetailBoards;
