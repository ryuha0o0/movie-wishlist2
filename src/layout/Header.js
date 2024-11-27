import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { faClapperboard, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { logout } from "../util/Auth"; // 로그아웃 함수 가져오기

function Header({ toggleTheme, isDarkMode }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isLoggedIn = !!localStorage.getItem("isLoggedInUser"); // 로그인 상태 확인

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="header">
            {/* 로고 */}
            <Link to="/" className="logo" onClick={toggleMenu}>
                <FontAwesomeIcon icon={faClapperboard} className="logo" />
            </Link>

            {/* 메뉴 토글 버튼 */}
            <button
                className={`menu-toggle ${isMenuOpen ? "open" : ""}`}
                onClick={toggleMenu}
            >
                {isMenuOpen ? "✖" : "☰"}
            </button>

            {/* 네비게이션 링크 */}
            <nav className={`nav-links ${isMenuOpen ? "open" : ""}`}>
                <Link to="/" onClick={toggleMenu}>
                    Home
                </Link>
                <Link to="/popular" onClick={toggleMenu}>
                    Popular
                </Link>
                <Link to="/search" onClick={toggleMenu}>
                    Search
                </Link>
                <Link to="/wishlist" onClick={toggleMenu}>
                    Wishlist
                </Link>
                {isLoggedIn ? (
                    // 로그아웃 버튼
                    <button onClick={logout} className="logout-button">
                        Logout
                    </button>
                ) : (
                    // 로그인 버튼
                    <Link to="/signin" onClick={toggleMenu}>
                        <FontAwesomeIcon icon={faUser} className="user-icon" />
                    </Link>
                )}
                <button onClick={toggleTheme} className="theme-toggle">
                    {isDarkMode ? "LightMode" : "DarkMode"}
                </button>
            </nav>
        </header>
    );
}

export default Header;
