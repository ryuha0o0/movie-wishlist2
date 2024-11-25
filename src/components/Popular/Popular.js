import React, { useState, useEffect, useCallback } from 'react';
import { fetchMovies } from '../../util/Movie';
import { isLoggedIn } from '../../util/Auth';
import './Popular.css';

function Popular({ apiKey }) {  // API 키를 props로 받음
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [showTopButton, setShowTopButton] = useState(false); // Top 버튼 표시 여부

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

    const handleDoubleClick = (movie) => {
        if (!isLoggedIn()) {
            alert("로그인이 필요합니다.");
            return;
        }

        // 현재 로그인된 사용자 가져오기
        const currentUser = JSON.parse(localStorage.getItem('isLoggedInUser')); // 이메일 저장
        if (!currentUser) {
            alert("사용자 정보를 찾을 수 없습니다. 다시 로그인해주세요.");
            return;
        }

        // 사용자별 위시리스트 가져오기
        const wishlistKey = `wishlist_${currentUser}`; // 사용자별로 구분되는 키 생성
        const wishlist = JSON.parse(localStorage.getItem(wishlistKey)) || []; // 사용자별 위시리스트 로드

        // 중복 확인 후 추가
        const movieExists = wishlist.find((item) => item.id === movie.id);
        if (!movieExists) {
            wishlist.push(movie);
            localStorage.setItem(wishlistKey, JSON.stringify(wishlist)); // 사용자별로 저장
            alert(`${movie.title}이(가) 위시리스트에 추가되었습니다.`);
        } else {
            alert("이미 위시리스트에 추가된 영화입니다.");
        }
    };


    return (
        <div className="popular">
            <h2>Popular Movies</h2>
            <div className="movies-grid">
                {movies.map((movie) => (
                    <div key={movie.id} className="movie-card" onDoubleClick={() => handleDoubleClick(movie)}>
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
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
