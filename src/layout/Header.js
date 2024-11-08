// src/layout/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header({ toggleTheme, isDarkMode }) {
    return (
        <header className="header">
            <Link to="/" className="logo">LOGO</Link>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/popular">Popular</Link>
                <Link to="/search">Search</Link>
                <Link to="/wishlist">My Wishlist</Link>
                <Link to="/signin">
                    <i className="icon">😎</i>
                </Link>
                <button onClick={toggleTheme} className="theme-toggle">
                    {isDarkMode ? '☀️' : '🌙'}
                </button>
            </nav>
        </header>
    );
}

export default Header;
