// src/layout/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
    return (
        <header className="header">
            <Link to="/" className="logo">
                <Link to="/" className="logo">LOGO</Link>
            </Link>
            <nav>
                <Link to="/">홈</Link>
                <Link to="/popular">대세 콘텐츠</Link>
                <Link to="/search">찾아보기</Link>
                <Link to="/wishlist">내가 찜한 리스트</Link>
                <Link to="/signin">
                    <i className="icon">👤</i> {/* 사용자 아이콘 예시 */}
                </Link>
            </nav>
        </header>
    );
}

export default Header;
