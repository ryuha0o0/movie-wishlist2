import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header({ toggleTheme, isDarkMode }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="header">
            <Link to="/" className="logo">LOGO</Link>

            {/* Toggle menu for mobile */}
            <button className="menu-toggle" onClick={toggleMenu}>
                {isMenuOpen ? '✖' : '☰'}
            </button>

            <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                <Link to="/" onClick={toggleMenu}>Home</Link>
                <Link to="/popular" onClick={toggleMenu}>Popular</Link>
                <Link to="/search" onClick={toggleMenu}>Search</Link>
                <Link to="/wishlist" onClick={toggleMenu}>My Wishlist</Link>
                <Link to="/signin" onClick={toggleMenu}>
                    <i className="icon">Login</i>
                </Link>
                <button onClick={toggleTheme} className="theme-toggle">
                    {isDarkMode ? 'LightMode' : 'DarkMode'}
                </button>
            </nav>
        </header>
    );
}

export default Header;
