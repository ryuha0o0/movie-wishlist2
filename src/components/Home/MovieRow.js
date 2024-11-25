import React, { useRef } from 'react';
import MovieCard from './MovieCard';
import './MovieRow.css';

const MovieRow = ({ title, movies, wishlist = [], toggleWishlist, onDoubleClick }) => {
    const scrollRef = useRef(null);

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -1500, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 1500, behavior: 'smooth' });
        }
    };

    const handleWheel = (event) => {
        if (scrollRef.current) {
            event.preventDefault();
            scrollRef.current.scrollBy({
                left: event.deltaY < 0 ? -100 : 100,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div className="movie-row">
            <h2>{title}</h2>
            <div className="scroll-container-wrapper">
                <button onClick={scrollLeft} className="arrow-button">{'<'}</button>
                <div
                    className="scroll-container"
                    ref={scrollRef}
                    onWheel={handleWheel}
                >
                    {movies.map((movie) => (
                        <div key={movie.id} className="movie-card-wrapper" >
                            <MovieCard
                                key={movie.id}
                                movie={movie}
                                isInWishlist={wishlist.some((item) => item.id === movie.id)} // 위시리스트 여부 판단
                                toggleWishlist={toggleWishlist}
                            />
                        </div>
                    ))}
                </div>
                <button onClick={scrollRight} className="arrow-button">{'>'}</button>
            </div>
        </div>
    );
};

export default MovieRow;
