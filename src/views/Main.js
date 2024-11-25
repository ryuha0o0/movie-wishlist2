import React, { useState, useEffect, useCallback } from 'react';
import Banner from '../components/Home/Banner';
import MovieRow from '../components/Home/MovieRow';
import { fetchMovies } from '../util/Movie';
import { isLoggedIn } from '../util/Auth';

const MainPage = ({ apiKey }) => {
    const [bannerMovie, setBannerMovie] = useState(null);
    const [actionMovies, setActionMovies] = useState([]);
    const [comedyMovies, setComedyMovies] = useState([]);
    const [dramaMovies, setDramaMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);

    const loadBannerMovie = useCallback(async () => {
        const response = await fetchMovies('/search/movie', apiKey, {
            query: '베놈: 라스트 댄스',
        });
        if (response.length > 0) {
            setBannerMovie(response[0]);
        }
    }, [apiKey]);

    const loadMoviesByGenre = useCallback(
        async (genreId, setMovies) => {
            setIsLoading(true);
            const movies = await fetchMovies('/discover/movie', apiKey, {
                with_genres: genreId,
                language: 'ko-KR', // 영화 데이터를 한국어로 설정
                page,
            });
            setMovies((prevMovies) => [
                ...prevMovies,
                ...movies.filter(
                    (movie) => !prevMovies.some((prevMovie) => prevMovie.id === movie.id)
                ),
            ]);
            setIsLoading(false);
        },
        [apiKey, page]
    );

    useEffect(() => {
        loadBannerMovie();
        loadMoviesByGenre(28, setActionMovies); // Action movies
        loadMoviesByGenre(35, setComedyMovies); // Comedy movies
        loadMoviesByGenre(18, setDramaMovies); // Drama movies
    }, [loadBannerMovie, loadMoviesByGenre]);

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop + 1 >=
                document.documentElement.scrollHeight &&
                !isLoading
            ) {
                setPage((prevPage) => prevPage + 1);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isLoading]);

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
        <div className="main-page">
            {bannerMovie && <Banner movie={bannerMovie} />}
            <MovieRow
                title="액션 영화"
                movies={actionMovies}
                onDoubleClick={handleDoubleClick}
            />
            <MovieRow
                title="코미디 영화"
                movies={comedyMovies}
                onDoubleClick={handleDoubleClick}
            />
            <MovieRow
                title="드라마 영화"
                movies={dramaMovies}
                onDoubleClick={handleDoubleClick}
            />
            {isLoading && <p className="loading">Loading...</p>}
        </div>
    );
};

export default MainPage;
