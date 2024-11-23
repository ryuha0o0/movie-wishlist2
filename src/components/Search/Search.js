import React, { useState, useEffect, useRef, useCallback } from 'react';
import { fetchMovies } from '../../util/Movie';
import { isLoggedIn } from '../../util/Auth';
import './Search.css';

function Search({ apiKey }) {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [genre, setGenre] = useState('');
    const [rating, setRating] = useState('');
    const [sort, setSort] = useState('popularity.desc');
    const [language, setLanguage] = useState('ko');
    const [searchQuery, setSearchQuery] = useState(''); // 검색어 상태 추가
    const loaderRef = useRef(null);

    const loadMovies = useCallback(async (page, reset = false) => {
        const params = {
            page,
            with_genres: genre,
            vote_average_gte: rating,
            sort_by: sort,
            language,
            query: searchQuery, // 검색어 추가
        };

        const movieData = await fetchMovies(
            searchQuery ? '/search/movie' : '/discover/movie',
            apiKey,
            params
        );

        if (reset) {
            setMovies(movieData);
        } else {
            setMovies((prevMovies) => [...prevMovies, ...movieData]);
        }

        setHasMore(movieData.length === 20);
    }, [genre, rating, sort, language, searchQuery, apiKey]);

    useEffect(() => {
        const resetAndLoad = async () => {
            setMovies([]);
            setPage(1);
            setHasMore(true);
            await loadMovies(1, true);
        };

        resetAndLoad();
    }, [loadMovies, genre, rating, sort, language, searchQuery]);

    useEffect(() => {
        if (page > 1) loadMovies(page);
    }, [page, loadMovies]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
                setPage((prevPage) => prevPage + 1);
            }
        }, { threshold: 1.0 });

        const currentLoader = loaderRef.current;
        if (currentLoader) {
            observer.observe(currentLoader);
        }

        return () => {
            if (currentLoader) observer.unobserve(currentLoader);
        };
    }, [hasMore]);

    const handleDoubleClick = (movie) => {
        if (!isLoggedIn()) {
            alert('로그인이 필요합니다.');
            return;
        }
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const movieExists = wishlist.find((item) => item.id === movie.id);
        if (!movieExists) {
            wishlist.push(movie);
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            alert(`${movie.title}이(가) 위시리스트에 추가되었습니다.`);
        } else {
            alert('이미 위시리스트에 추가된 영화입니다.');
        }
    };

    return (
        <div className="search">
            <h2>Search Movies</h2>

            <div className="filters">
                <input
                    type="text"
                    placeholder="Search movies..."
                    value={searchQuery} // 검색어 상태 연결
                    onChange={(e) => setSearchQuery(e.target.value)} // 상태 업데이트
                />
                <select onChange={(e) => setGenre(e.target.value)} value={genre}>
                    <option value="">Genre (All)</option>
                    <option value="28">Action</option>
                    <option value="12">Adventure</option>
                    <option value="16">Animation</option>
                    <option value="35">Comedy</option>
                    <option value="80">Crime</option>
                    <option value="99">Documentary</option>
                    <option value="18">Drama</option>
                    <option value="10751">Family</option>
                    <option value="14">Fantasy</option>
                    <option value="36">History</option>
                    <option value="27">Horror</option>
                    <option value="10402">Music</option>
                    <option value="9648">Mystery</option>
                    <option value="10749">Romance</option>
                    <option value="878">Science Fiction</option>
                    <option value="10770">TV Movie</option>
                    <option value="53">Thriller</option>
                    <option value="10752">War</option>
                    <option value="37">Western</option>
                </select>
                <select onChange={(e) => setRating(e.target.value)} value={rating}>
                    <option value="">Rating (All)</option>
                    <option value="7">7+</option>
                    <option value="8">8+</option>
                    <option value="9">9+</option>
                </select>
                <select onChange={(e) => setSort(e.target.value)} value={sort}>
                    <option value="popularity.desc">Popularity</option>
                    <option value="release_date.desc">Release Date</option>
                </select>
                <select onChange={(e) => setLanguage(e.target.value)} value={language}>
                    <option value="ko">Korean (Default)</option>
                    <option value="en">English</option>
                    <option value="fr">French</option>
                    <option value="es">Spanish</option>
                    <option value="de">German</option>
                </select>
                <button
                    onClick={() => {
                        setSearchQuery(''); // 검색어 초기화
                        setGenre('');
                        setRating('');
                        setSort('popularity.desc');
                        setLanguage('ko'); // 초기화 시 한국어로 설정
                        setMovies([]); // 영화 목록 초기화
                        setPage(1); // 페이지 초기화
                        setHasMore(true); // 더 로드 가능 상태 초기화
                        loadMovies(1, true); // 새 데이터를 로드
                    }}
                >
                    초기화
                </button>
            </div>

            <div className="movie-grid">
                {movies.map((movie) => (
                    <div key={movie.id} className="movie-card" onDoubleClick={() => handleDoubleClick(movie)}>
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                        />
                    </div>
                ))}
            </div>

            <div ref={loaderRef} className="loader">
                {hasMore ? 'Loading more movies...' : 'No more movies'}
            </div>
        </div>
    );
}

export default Search;
