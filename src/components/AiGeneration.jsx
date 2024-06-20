// src/components/YourComponent.jsx
import React, { useState } from 'react';
import { auth } from '../services/FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

const AiGeneration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                console.log('Signed in:', userCredential.user);
            })
            .catch(error => {
                console.error('Error signing in:', error);
            });
    };

    return (
        <div>
            <h1>Firebase Auth Example</h1>
            <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button onClick={signIn}>Sign In</button>
        </div>
    );
};

export default AiGeneration;
