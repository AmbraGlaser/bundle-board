// src/contexts/UserContext.js
import React, { createContext, useState, useEffect } from "react";
import {
  onAuthStateChanged,
  getAuth,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { auth } from "../services/FirebaseConfig";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          if (currentUser) {
            console.log("User is logged in:", currentUser);
            setUser(currentUser);
          } else {
            console.log("No user is logged in");
            setUser(null);
          }
        });

        return () => unsubscribe();
      })
      .catch((error) => {
        console.error("Error setting auth persistence:", error);
      });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
