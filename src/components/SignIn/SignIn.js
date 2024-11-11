import React, { useState } from 'react';
import { tryLogin, tryRegister } from '../../util/Auth';
import './SignIn.css';

function SignIn() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = () => {
        console.log('Trying to login:', email);
        const user = tryLogin(email, password);
        setMessage(user ? "Login Successful!" : "Invalid Credentials");
    };

    const handleRegister = () => {
        console.log('Trying to register:', email);
        const success = tryRegister(email, password);
        setMessage(success ? "Registration Successful!" : "User already exists");
        if (success) setIsLogin(true);
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className="signin-container">
            <div className={`signin-card ${isLogin ? 'show-login' : 'show-register'}`}>
                <div className="signin-content">
                    {isLogin ? (
                        <>
                            <h2>Login</h2>
                            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                            <button onClick={handleLogin}>Login</button>
                            <p onClick={toggleForm}>Create an account</p>
                        </>
                    ) : (
                        <>
                            <h2>Register</h2>
                            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                            <button onClick={handleRegister}>Register</button>
                            <p onClick={toggleForm}>Back to Login</p>
                        </>
                    )}
                </div>
            </div>
            <p className="message">{message}</p>
        </div>
    );
}

export default SignIn;
