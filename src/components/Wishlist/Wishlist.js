import React, { useState, useEffect } from 'react';
import './Wishlist.css';
import { getCurrentUser } from '../../util/Auth'; // 현재 로그인된 사용자 가져오기

function Wishlist() {
    const [wishlist, setWishlist] = useState([]);
    const currentUser = getCurrentUser(); // 현재 로그인된 사용자 가져오기


    useEffect(() => {
        if (currentUser) {
            const wishlistKey = `wishlist_${currentUser.email}`;
            const userWishlist = JSON.parse(localStorage.getItem(wishlistKey)) || [];
            setWishlist(userWishlist);
        }
    }, [currentUser]);


    const removeFromWishlist = (movieId) => {
        const updatedWishlist = wishlist.filter((movie) => movie.id !== movieId);
        setWishlist(updatedWishlist);

        // 사용자별 위시리스트 업데이트
        if (currentUser) {
            localStorage.setItem(`wishlist_${currentUser.email}`, JSON.stringify(updatedWishlist));
        }
    };

    if (!currentUser) {
        // 로그인되지 않은 경우
        return <p>로그인 후 위시리스트를 확인하세요.</p>;
    }

    return (
        <div className="wishlist">
            <h2>{currentUser.email}의 Wishlist</h2>
            {wishlist.length === 0 ? (
                <p>위시리스트가 비어 있습니다.</p>
            ) : (
                <div className="movies-grid">
                    {wishlist.map((movie) => (
                        <div key={movie.id} className="movie-card">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                onError={(e) => (e.target.src = '/fallback-image.png')}
                            />
                            <h3>{movie.title}</h3>
                            <button onClick={() => removeFromWishlist(movie.id)}>Remove</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Wishlist;
