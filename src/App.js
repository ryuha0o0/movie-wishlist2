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
    return isLoggedIn() ? children : <Navigate to="/signin" replace />;
};

function App() {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    const [apiKey, setApiKey] = useState('');
    const [loggedIn, setLoggedIn] = useState(isLoggedIn());

    // 사용자 정보 및 API 키 가져오기
    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('isLoggedInUser'));
        if (currentUser) {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find((u) => u.email === currentUser);
            if (user && user.password) {
                setApiKey(user.password); // ⚠️ 비밀번호를 API 키로 사용하는 것은 권장되지 않습니다.
            }
        }
    }, []);

    // 테마 초기화
    useEffect(() => {
        document.documentElement.setAttribute(
            'data-theme',
            isDarkMode ? 'dark' : 'light'
        );
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    const toggleTheme = () => setIsDarkMode((prevMode) => !prevMode);

    const handleLogout = () => {
        localStorage.removeItem('isLoggedInUser');
        setLoggedIn(false);
        setApiKey('');
    };

    return (
        <Router basename="/movie-wishlist2"> {/* basename 설정 */}
            <Header
                toggleTheme={toggleTheme}
                isDarkMode={isDarkMode}
                loggedIn={loggedIn}
                onLogout={handleLogout}
            />
            <Routes>
                {/* 로그인 페이지 */}
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
