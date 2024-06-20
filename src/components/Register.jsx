// src/components/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth, createUserWithEmailAndPassword, doc, setDoc } from '../services/FirebaseConfig';

const Register = ({ toggleForm }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            // Maak een nieuwe gebruiker aan met email en wachtwoord
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Sla extra user informatie op in Firestore
            await setDoc(doc(db, 'users', user.uid), {
                email,
                name,
                password
            });

            navigate('/profilepage', { state: { user: { email: user.email, uid: user.uid } } });
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex justify-center items-start h-screen">
            <div className="flex flex-col self-start m-2 rounded border-2 border-purple dark:border-light-blue p-6 max-w-md md:max-w-lg lg:max-w-xl w-full bg-light font-Secundair dark:bg-dark shadow-md shadow-purple dark:shadow-light-blue">
                <form className="w-full" onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-Title text-purple dark:text-light-blue font-bold mb-5">Sign Up</h2>
                    <div className="mb-5">
                        <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-purple dark:text-light-blue"
                        >
                            Your name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="John Doe"
                            required
                        />
                    </div>
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
                        className="text-purple dark:text-light-blue focus:ring-4 focus:outline-none focus:ring-purple font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:focus:ring-light-blue"
                    >
                        Sign Up
                    </button>
                    {error && <p className="mt-5 text-red-600">{error}</p>}
                    <p className="mt-5 text-sm text-dark dark:text-light">
                        Already have an account?{" "}
                        <button
                            type="button"
                            onClick={toggleForm}
                            className="text-purple dark:text-light-blue hover:underline"
                        >
                            Login
                        </button>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
