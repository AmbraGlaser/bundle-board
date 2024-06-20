import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { auth, db, getDoc, doc } from '../services/FirebaseConfig'; // Importeer getDoc en doc uit FirebaseConfig
import { signInWithEmailAndPassword } from 'firebase/auth';
import Register from '../components/Register';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError(null);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const { email: userEmail, uid } = userCredential.user;

      // Haal de gebruikersinformatie op uit Firestore
      const userDocRef = doc(db, 'users', uid); // Referentie naar het document van de gebruiker
      const userDocSnap = await getDoc(userDocRef); // Snapshot van het document

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();

        // Navigeer naar de ProfilePage en geef gebruikersgegevens door
        navigate('/profilepage', { state: { user: { name: userData.name } } });
      } else {
        setError("Gebruikersgegevens niet gevonden.");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-start h-screen">
      <div className="flex flex-col self-start m-2 rounded border-2 border-purple dark:border-light-blue p-6 max-w-md md:max-w-lg lg:max-w-xl w-full bg-light font-Secundair dark:bg-dark shadow-md shadow-purple dark:shadow-light-blue">
        <form className="w-full" onSubmit={isLogin ? handleSignIn : null}>
          {isLogin ? (
            <>
              <h2 className="text-2xl font-Title text-purple dark:text-light-blue font-bold mb-5">
                Login
              </h2>
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-purple dark:text-light-blue"
                >
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@email.com"
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-purple dark:text-light-blue"
                >
                  Your password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="text-purple font-Title dark:text-light-blue bg-light dark:bg-dark focus:ring-4 focus:outline-none focus:ring-purple font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:focus:ring-light-blue"
              >
                Login
              </button>
              <p className="mt-5 text-sm text-dark dark:text-light">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={toggleForm}
                  className="text-purple dark:text-light-blue hover:underline"
                >
                  Sign up
                </button>
              </p>
            </>
          ) : (
            <Register toggleForm={toggleForm} />
          )}
        </form>
        {error && <p className="mt-5 text-red-600">{error}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
