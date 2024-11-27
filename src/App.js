import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './layout/Header';
import Main from './views/Main';
import Popular from './components/Popular/Popular';
import Search from './components/Search/Search';
import Wishlist from './components/Wishlist/Wishlist';
import SignIn from './components/SignIn/SignIn';
import './theme.css';

// 로그인 확인 함수
const isLoggedIn = () => {
    const currentUser = JSON.parse(localStorage.getItem('isLoggedInUser'));
    return !!currentUser; // 로그인된 사용자 확인
};

// Protected Route 컴포넌트
const ProtectedRoute = ({ children }) => {
    if (!isLoggedIn()) {
        return <Navigate to="/signin" replace />;
    }
    return children;
};

function App() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [apiKey, setApiKey] = useState(''); // API 키를 상태로 관리
    const [loggedIn, setLoggedIn] = useState(isLoggedIn()); // 로그인 상태 관리

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('isLoggedInUser'));
        if (currentUser) {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find((u) => u.email === currentUser);
            if (user && user.password) {
                setApiKey(user.password); // 비밀번호를 API 키로 사용
            }
        }
    }, []);

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

    // 로그아웃 함수
    const handleLogout = () => {
        localStorage.removeItem('isLoggedInUser');
        setLoggedIn(false);
        setApiKey('');
    };

    return (
        <Router>
            <Header
                toggleTheme={toggleTheme}
                isDarkMode={isDarkMode}
                loggedIn={loggedIn}
                onLogout={handleLogout} // 로그아웃 함수 전달
            />
            <Routes>
                {/* 로그인하지 않은 경우 /signin으로 이동 */}
                <Route path="/signin" element={<SignIn setApiKey={setApiKey} />} />

                {/* 보호된 경로 */}
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Main apiKey={apiKey} />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/movie-wishlist2/"
                    element={
                        <ProtectedRoute>
                            <Main apiKey={apiKey} />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/popular"
                    element={
                        <ProtectedRoute>
                            <Popular apiKey={apiKey} />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/search"
                    element={
                        <ProtectedRoute>
                            <Search apiKey={apiKey} />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/wishlist"
                    element={
                        <ProtectedRoute>
                            <Wishlist apiKey={apiKey} />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;