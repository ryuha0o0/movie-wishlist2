import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import './MovieCard.css';

const MovieCard = ({ movie, isInWishlist, toggleWishlist }) => {
    const imageUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'https://via.placeholder.com/100x150';

    return (
        <div className="movie-card">
            <div
                className="wishlist-icon"
                onClick={() => toggleWishlist(movie)}
            >
                <FontAwesomeIcon
                    icon={isInWishlist ? solidHeart : regularHeart}
                    className="heart-icon"
                    style={{ fontSize: '1.5rem', color: isInWishlist ? '#ff4d4d' : '#ccc' }}
                />
            </div>
            <img src={imageUrl} alt={movie.title} />
            <div className="movie-title">
                {movie.title || 'Unknown Title'}
            </div>
        </div>
    );
};

export default MovieCard;
