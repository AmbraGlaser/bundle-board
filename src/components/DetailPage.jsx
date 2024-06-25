import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import {
  db,
  doc,
  updateDoc,
  arrayUnion,
  setDoc,
  getDoc,
  collection,
  getDocs,
} from "../services/FirebaseConfig";

const DetailPage = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [imageData, setImageData] = useState(null);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [boardTitle, setBoardTitle] = useState("");
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState("");

  const accessKey = "4enS4f3YopIfkSudT_f_-mVR6RAsYRDWjIANb8S3Y2Q";

  useEffect(() => {
    const fetchImageDetail = async () => {
      try {
        const response = await fetch(
          `https://api.unsplash.com/photos/${id}?client_id=${accessKey}`
        );
        if (!response.ok) {
          if (response.status === 403) {
            setError("Access forbidden: 403");
          } else {
            throw new Error("Request failed");
          }
        } else {
          const data = await response.json();
          setImageData(data);
        }
      } catch (error) {
        console.error(error);
        setError("An error occurred while fetching image details.");
      }
    };

    fetchImageDetail();
  }, [id]);

  useEffect(() => {
    const fetchBoards = async () => {
      if (user) {
        try {
          const boardsCollection = collection(
            db,
            "users",
            user.uid,
            "inspirationBoards"
          );
          const boardsSnapshot = await getDocs(boardsCollection);
          const boardsList = boardsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setBoards(boardsList);
        } catch (error) {
          console.error("Error fetching boards: ", error);
        }
      }
    };

    fetchBoards();
  }, [user]);

  useEffect(() => {
    const fetchBoards = async () => {
      if (user) {
        try {
          console.log("User UID:", user.uid);
          const boardsCollection = collection(
            db,
            "users",
            user.uid,
            "inspirationBoards"
          );
          const boardsSnapshot = await getDocs(boardsCollection);
          const boardsList = boardsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setBoards(boardsList);
        } catch (error) {
          console.error("Error fetching boards: ", error);
        }
      }
    };

    fetchBoards();
  }, [user]);

  const handleAddToBoard = async () => {
    try {
      if (!boardTitle && !selectedBoard) {
        console.error("Board title or selection is missing");
        return;
      }

      let boardDocRef;

      if (selectedBoard) {
        boardDocRef = doc(
          db,
          "users",
          user.uid,
          "inspirationBoards",
          selectedBoard
        );
      } else {
        boardDocRef = doc(
          db,
          "users",
          user.uid,
          "inspirationBoards",
          boardTitle
        );
        await setDoc(boardDocRef, {
          title: boardTitle,
          photos: [],
        });
      }

      await updateDoc(boardDocRef, {
        photos: arrayUnion({
          photoId: imageData.id,
          photoUrl: imageData.urls.small,
          description: imageData.alt_description || "No Description",
        }),
      });

      setShowPopup(false);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  if (error) {
    return <div className="error-page">{error}</div>;
  }

  if (!imageData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col md:flex-row self-start m-2 rounded border-2 border-purple dark:border-light-blue p-2 max-w-5xl">
        <img
          className="h-auto object-cover mr-0 md:mr-4 mb-4 md:mb-0"
          src={imageData.urls.small}
          alt={imageData.alt_description}
        />
        <div className="flex flex-col items-start justify-center">
          <h1 className="text-2xl font-Title text-purple dark:text-light-blue mb-2 uppercase">
            {imageData.alt_description || "No Description"}
          </h1>
          <p className="font-Secundair text-purple dark:text-light-blue mb-8">
            {imageData.user.name}
          </p>
          <button
            className="text-purple dark:text-light-blue focus:ring-4 focus:outline-none focus:ring-purple font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:focus:ring-light-blue mt-4"
            onClick={() => setShowPopup(true)}
          >
            Add to Inspiration Board
          </button>
        </div>
      </div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-dark bg-opacity-50 z-50">
          <div className="bg-light dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-md w-full">
            <h2 className="text-xl mb-4 text-purple dark:text-light-blue">
              Add to Inspiration Board
            </h2>
            <select
              value={selectedBoard}
              onChange={(e) => setSelectedBoard(e.target.value)}
              className="border p-2 mb-4 w-full dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select a board</option>
              {boards.map((board) => (
                <option key={board.id} value={board.id}>
                  {board.title}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Or create new board"
              value={boardTitle}
              onChange={(e) => setBoardTitle(e.target.value)}
              className="border p-2 mb-4 w-full dark:bg-gray-700 dark:text-white"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleAddToBoard}
                className="bg-purple text-white px-4 py-2 rounded"
              >
                Add
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded dark:bg-gray-600 dark:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailPage;
