import React, { useEffect, useState, useRef } from 'react';
import { fetchMovies } from '../../util/Movie';
import { isLoggedIn } from '../../util/Auth';
import './Main.css';

function Main() {
    const [popularMovies, setPopularMovies] = useState([]);
    const [romanceMovies, setRomanceMovies] = useState([]);
    const [latestMovies, setLatestMovies] = useState([]);
    const [popularPage, setPopularPage] = useState(1);
    const [romancePage, setRomancePage] = useState(1);
    const [latestPage, setLatestPage] = useState(1);
    const bottomRef = useRef(null);

    const MAX_DISPLAY_COUNT = 8; // Limit to 2 rows, assuming 4 movies per row

    const loadMovies = async (category, page) => {
        let movies = [];
        switch (category) {
            case 'popular':
                movies = await fetchMovies('/movie/popular', page);
                setPopularMovies((prev) => [...prev, ...movies]);
                break;
            case 'romance':
                movies = await fetchMovies('/discover/movie?with_genres=10749', page);
                setRomanceMovies((prev) => [...prev, ...movies]);
                break;
            case 'latest':
                movies = await fetchMovies('/movie/now_playing', page);
                setLatestMovies((prev) => [...prev, ...movies]);
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        loadMovies('popular', popularPage);
        loadMovies('romance', romancePage);
        loadMovies('latest', latestPage);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setLatestPage((prev) => prev + 1);
            }
        }, { threshold: 1 });

        if (bottomRef.current) {
            observer.observe(bottomRef.current);
        }
        return () => observer.disconnect();
    }, [bottomRef]);

    useEffect(() => {
        if (latestPage > 1) loadMovies('latest', latestPage);
    }, [latestPage]);

    const handleDoubleClick = (movie) => {
        if (!isLoggedIn()) {
            alert("로그인이 필요합니다.");
            return;
        }
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const movieExists = wishlist.find((item) => item.id === movie.id);
        if (!movieExists) {
            wishlist.push(movie);
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            alert(`${movie.title}이(가) 위시리스트에 추가되었습니다.`);
        } else {
            alert("이미 위시리스트에 추가된 영화입니다.");
        }
    };

    const renderMovies = (movies, limit = movies.length) => (
        <div className="movies-grid">
            {movies.slice(0, limit).map((movie) => (
                <div key={movie.id} className="movie-card" onDoubleClick={() => handleDoubleClick(movie)}>
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                    <h3>{movie.title}</h3>
                </div>
            ))}
        </div>
    );

    return (
        <div className="main">
            <h2>Popular Movies</h2>
            {renderMovies(popularMovies, MAX_DISPLAY_COUNT)}
            <h2>Romance Movies</h2>
            {renderMovies(romanceMovies, MAX_DISPLAY_COUNT)}
            <h2>Latest Movies</h2>
            {renderMovies(latestMovies)}
            <div ref={bottomRef} className="load-more-trigger"></div>
        </div>
    );
}

export default Main;
