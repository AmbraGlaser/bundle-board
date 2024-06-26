// src/pages/ProfilePage.jsx
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import {
  db,
  doc,
  getDoc,
  collection,
  getDocs,
  deleteDoc,
} from "../services/FirebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, deleteUser } from "firebase/auth"; // Import getAuth and deleteUser
import Modal from "../components/Modal";
import NameChangeForm from "../components/NameChangeForm";

const ProfilePage = () => {
  const { user, setUser } = useContext(UserContext);
  const [boards, setBoards] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (user && user.uid) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            console.log("No such user document!");
          }
        } catch (error) {
          console.error("Error fetching user data: ", error);
        }
      } else {
        console.log("No user logged in or user.uid is undefined");
      }
    };

    const fetchBoards = async () => {
      if (user && user.uid) {
        try {
          console.log("Fetching boards for user:", user.uid);
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
          console.log("Boards fetched:", boardsList);
          setBoards(boardsList);
        } catch (error) {
          console.error("Error fetching boards: ", error);
        }
      } else {
        console.log("No user logged in or user.uid is undefined");
      }
      setLoading(false);
    };

    fetchUserData();
    fetchBoards();
  }, [user]);

  const handleDeleteAccount = async () => {
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      const auth = getAuth();
      const currentUser = auth.currentUser;

      try {
        await deleteDoc(userDocRef);
        if (currentUser) {
          await deleteUser(currentUser);
        }
        setUser(null);
        navigate("/");
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>No user logged in</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold font-Title text-purple dark:text-light-blue">
        Welkom {userData?.name || "Guest"}
      </h1>
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => setIsModalOpen(true)}
      >
        Change Name
      </button>
      <div className="mt-6 w-full max-w-6xl">
        <h2 className="text-xl font-semibold text-center text-purple dark:text-light-blue mb-4">
          Your Inspiration Boards
        </h2>
        <div className="flex flex-wrap justify-center gap-4 m-3 border-purple dark:border-light-blue border-2 p-2">
          {boards.length > 0 ? (
            boards.map((board) => (
              <Link to={`/boards/${board.id}`} key={board.id} className="w-64">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold text-purple dark:text-light-blue mb-2">
                    {board.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {board.photos && board.photos.length > 0 ? (
                      board.photos.map((photo, index) => (
                        <img
                          key={index}
                          src={photo.photoUrl}
                          alt={photo.description}
                          className="w-16 h-16 object-cover rounded"
                        />
                      ))
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400">
                        No photos
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              No inspiration boards found.
            </p>
          )}
        </div>
        <button
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
          onClick={handleDeleteAccount}
        >
          Delete Account
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Wil je je naam veranderen?"
      >
        <NameChangeForm
          onClose={() => setIsModalOpen(false)}
          currentName={userData?.name || ""}
        />
      </Modal>
    </div>
  );
};

export default ProfilePage;
