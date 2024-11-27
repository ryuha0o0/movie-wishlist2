// Banner.js
import React from 'react';
import './Banner.css';

const Banner = ({ movie }) => {
    const imageUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
    const description = movie.overview || "No description available.";

    return (
        <div className="banner" style={{ backgroundImage: `url(${imageUrl})` }}>
            <div className="banner-content">
                <h1>{movie.title}</h1>
                <p>{description}</p>
                <div className="banner-buttons">
                    <button>재생!</button>
                    <button>상세 정보</button>
                </div>
            </div>
        </div>
    );
};

export default Banner;
