import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import {
  db,
  doc,
  getDoc,
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
} from "../services/FirebaseConfig";
import { Link } from "react-router-dom";
import Modal from "./Modal";

const ProfilePage = () => {
  const { user, setUser } = useContext(UserContext);
  const [boards, setBoards] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          console.error("Error fetching boards:", error);
        }
      } else {
        console.log("No user logged in or user.uid is undefined");
      }
      setLoading(false);
    };

    fetchUserData();
    fetchBoards();
  }, [user]);

  const handleNameChange = async (e) => {
    e.preventDefault();
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, { name: newName });
      setUserData({ ...userData, name: newName });
      setIsModalOpen(false); // Close modal after updating name
    }
  };

  const handleDeleteAccount = async () => {
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      try {
        await deleteDoc(userDocRef);
        await deleteUser(user);
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
        Welcome {userData?.name || "Guest"}
      </h1>
      <button
        className="text-purple dark:text-light-blue"
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
                <div className="bg-light dark:bg-dark p-4 rounded-lg shadow-md">
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
                      <p className="text-purple dark:text-light-blue">
                        No photos
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-purple dark:text-light-blue">
              No inspiration boards found.
            </p>
          )}
        </div>
        <button
          className="text-purple dark:text-light-blue"
          onClick={handleDeleteAccount}
        >
          Delete Account
        </button>
      </div>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Would you like to change your name?"
        >
          <form onSubmit={handleNameChange} className="flex flex-col">
            <label className="mb-2 font-bold text-purple dark:text-light-blue">
              New Name
            </label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="p-2 mb-4 border rounded text-purple dark:text-light-blue"
              required
            />
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-light dark:bg-dark text-purple dark:text-light-blue rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-light dark:bg-dark text-purple dark:text-light-blue rounded"
              >
                Change Name
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default ProfilePage;
