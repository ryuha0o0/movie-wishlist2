import React, { useState, useEffect, useCallback } from 'react';
import { fetchMovies } from '../../util/Movie';
import './Popular.css';
import MovieCard from "../Home/MovieCard";


function Popular({ apiKey }) {  // API 키를 props로 받음
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [showTopButton, setShowTopButton] = useState(false); // Top 버튼 표시 여부
    const [wishlist, setWishlist] = useState([]);


    // loadMovies 함수를 useCallback으로 메모이제이션
    const loadMovies = useCallback(async () => {
        setIsLoading(true);

        // page와 apiKey를 매개변수로 전달
        const popularMovies = await fetchMovies('/movie/popular', apiKey, {
            page,
            language: 'ko-KR' // 영화 데이터를 한국어로 설정
        });

        // 중복 영화 제거
        setMovies((prevMovies) => {
            const newMovies = popularMovies.filter(
                (movie) => !prevMovies.some((prevMovie) => prevMovie.id === movie.id)
            );
            return [...prevMovies, ...newMovies];
        });

        setIsLoading(false);
    }, [page, apiKey]); // page와 apiKey가 변경될 때마다 loadMovies 함수가 업데이트되도록 의존성 배열에 추가

    useEffect(() => {
        loadMovies();
    }, [loadMovies]); // loadMovies를 의존성 배열에 추가

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('isLoggedInUser'));
        if (currentUser) {
            const wishlistKey = `wishlist_${currentUser}`;
            const savedWishlist = JSON.parse(localStorage.getItem(wishlistKey)) || [];
            setWishlist(savedWishlist);
        }
    }, []);


    useEffect(() => {
        const handleScroll = () => {
            setShowTopButton(window.scrollY > 200); // 스크롤 200px 이후 Top 버튼 표시
            if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight && !isLoading) {
                setPage((prevPage) => prevPage + 1);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isLoading]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const toggleWishlist = (movie) => {
        const currentUser = JSON.parse(localStorage.getItem('isLoggedInUser'));
        if (!currentUser) {
            alert('로그인이 필요합니다.');
            return;
        }

        const wishlistKey = `wishlist_${currentUser}`;
        const updatedWishlist = [...wishlist];
        const movieIndex = updatedWishlist.findIndex((item) => item.id === movie.id);

        if (movieIndex > -1) {
            updatedWishlist.splice(movieIndex, 1);
        } else {
            updatedWishlist.push(movie);
        }

        localStorage.setItem(wishlistKey, JSON.stringify(updatedWishlist));
        setWishlist(updatedWishlist);
    };



    return (
        <div className="popular">
            <h2>Popular Movies</h2>
            <div className="movies-grid">
                {movies.map((movie) => (
                    <div key={movie.id} className="movie-card">
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            isInWishlist={wishlist.some((item) => item.id === movie.id)} // 위시리스트 여부 판단
                            toggleWishlist={toggleWishlist}
                        />
                    </div>
                ))}
            </div>
            {showTopButton && (
                <button className="top-button" onClick={scrollToTop}>
                    Top
                </button>
            )}
            {isLoading && <p className="loading">Loading...</p>}
        </div>
    );
}

export default Popular;
