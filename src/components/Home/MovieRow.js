import React, { useRef } from 'react';
import MovieCard from './MovieCard';
import './MovieRow.css';

const MovieRow = ({ title, movies, onDoubleClick }) => {
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

    // 마우스 휠로 가로 스크롤 제어
    const handleWheel = (event) => {
        if (scrollRef.current) {
            event.preventDefault(); // 기본 세로 스크롤 방지
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
                    onWheel={handleWheel} // 마우스 휠 이벤트 추가
                >
                    {movies.map((movie) => (
                        <div key={movie.id} className="movie-card-wrapper" onDoubleClick={() => onDoubleClick(movie)}>
                            <MovieCard movie={movie} />
                        </div>
                    ))}
                </div>
                <button onClick={scrollRight} className="arrow-button">{'>'}</button>
            </div>
        </div>
    );
};

export default MovieRow;
