import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './layout/Header';
import Main from './views/Main';
import Popular from './components/Popular/Popular';
import Search from './components/Search/Search';
import Wishlist from './components/Wishlist/Wishlist';
import SignIn from './components/SignIn/SignIn';
import './theme.css';

function App() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [apiKey, setApiKey] = useState(''); // API 키를 상태로 관리

    useEffect(() => {
        const currentTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);
        setIsDarkMode(currentTheme === 'dark');
    }, []);

    const toggleTheme = () => {
        const newTheme = isDarkMode ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        setIsDarkMode(!isDarkMode);
    };

    return (
        <Router>
            <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
            <Routes>
                <Route path="/movie-wishlist2/" element={<Main apiKey={apiKey}/>} />
                <Route path="/" element={<Main apiKey={apiKey}/>} />
                <Route path="/popular" element={<Popular apiKey={apiKey} />} />
                <Route path="/search" element={<Search apiKey={apiKey} />} />
                <Route path="/wishlist" element={<Wishlist apiKey={apiKey}/>} />
                <Route
                    path="/signin"
                    element={<SignIn setApiKey={setApiKey} />}  // SignIn에서 API_KEY를 받아옴
                />
            </Routes>
        </Router>
    );
}

export default App;
