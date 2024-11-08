import React from 'react';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
    const imageUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'https://via.placeholder.com/100x150'; // Default image size에 맞춤

    return (
        <div className="movie-card"> {/* 클래스 추가 */}
            <img src={imageUrl} alt={movie.title} />
        </div>
    );
};

export default MovieCard;
