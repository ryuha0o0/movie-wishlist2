// src/components/Home/Wishlist.js
import React, { useState, useEffect } from 'react';
import './Wishlist.css';

function Wishlist() {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        setWishlist(savedWishlist);
    }, []);

    const removeFromWishlist = (movieId) => {
        const updatedWishlist = wishlist.filter((movie) => movie.id !== movieId);
        setWishlist(updatedWishlist);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    };

    return (
        <div className="wishlist">
            <h2>My Wishlist</h2>
            <div className="movies-grid">
                {wishlist.map((movie) => (
                    <div key={movie.id} className="movie-card">
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                        <h3>{movie.title}</h3>
                        <button onClick={() => removeFromWishlist(movie.id)}>Remove</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Wishlist;
