// src/components/LoginPage.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  auth,
  db,
  getDoc,
  doc,
  createUserWithEmailAndPassword,
  setDoc,
  signInWithEmailAndPassword,
} from "../services/FirebaseConfig";
import Register from "./Register";
import Login from "./Login";
import { UserContext } from "../contexts/UserContext";

const LoginPage = () => {
  const { setUser } = useContext(UserContext);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (isLogin) {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        const userDoc = await getDoc(doc(db, "users", user.uid));

        if (userDoc.exists()) {
          setUser(userDoc.data());
          navigate("/profilepage");
        } else {
          setError("User data not found");
        }
      } catch (error) {
        setError(error.message);
      }
    } else {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        const userData = {
          email,
          name,
          password, // Opslaan van het wachtwoord in Firestore (niet aanbevolen in productieomgevingen)
        };

        await setDoc(doc(db, "users", user.uid), userData);
        setUser(userData);
        navigate("/profilepage");
      } catch (error) {
        setError(error.message);
      }
    }
  };

  return (
    <div className="flex justify-center items-start h-screen">
      <div className="flex flex-col self-start m-2 rounded border-2 border-purple dark:border-light-blue p-6 max-w-md md:max-w-lg lg:max-w-xl w-full bg-light font-Secundair dark:bg-dark shadow-md shadow-purple dark:shadow-light-blue">
        <form className="w-full" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-Title text-purple dark:text-light-blue font-bold mb-5">
            {isLogin ? "Login" : "Sign Up"}
          </h2>
          {isLogin ? (
            <Login
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              toggleForm={toggleForm}
            />
          ) : (
            <Register
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              name={name}
              setName={setName}
              toggleForm={toggleForm}
            />
          )}
          <button
            type="submit"
            className="text-purple dark:text-light-blue focus:ring-4 focus:outline-none focus:ring-purple font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:focus:ring-light-blue mt-4"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
          {error && <p className="mt-5 text-red-600">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
