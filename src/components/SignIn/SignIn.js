import React, { useState } from 'react';
import { tryLogin, tryRegister } from '../../util/Auth';
import './SignIn.css';

function SignIn() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [flipCount, setFlipCount] = useState(0);

    const handleLogin = () => {
        const user = tryLogin(email, password);
        setMessage(user ? "Login Successful!" : "Invalid Credentials");
    };

    const handleRegister = () => {
        const success = tryRegister(email, password);
        setMessage(success ? "Registration Successful!" : "User already exists");
        if (success) setIsLogin(true);
    };

    const toggleForm = () => {
        if (flipCount >= 30) {
            alert("그만!");
            return;
        }
        setIsLogin(!isLogin);
        setFlipCount(flipCount + 1);
    };

    return (
        <div className={`signin-container ${isLogin ? 'login-view' : 'register-view'}`}>
            <div className="signin-card">
                <div className="signin-content login-content">
                    <h2>Login</h2>
                    <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={handleLogin}>Login</button>
                    <p onClick={toggleForm}>Create an account</p>
                </div>
                <div className="signin-content register-content">
                    <h2>Register</h2>
                    <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={handleRegister}>Register</button>
                    <p onClick={toggleForm}>Back to Login</p>
                </div>
            </div>
            <p className="message">{message}</p>
        </div>
    );
}

export default SignIn;
