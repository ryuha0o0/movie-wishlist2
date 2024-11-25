import React, { useState, useEffect, useCallback } from 'react';
import Banner from '../components/Home/Banner';
import MovieRow from '../components/Home/MovieRow';
import { fetchMovies } from '../util/Movie';

const MainPage = ({ apiKey }) => {
    const [bannerMovie, setBannerMovie] = useState(null);
    const [actionMovies, setActionMovies] = useState([]);
    const [comedyMovies, setComedyMovies] = useState([]);
    const [dramaMovies, setDramaMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [wishlist, setWishlist] = useState([]); // 위시리스트 상태 추가


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
        const currentUser = JSON.parse(localStorage.getItem('isLoggedInUser'));
        if (currentUser) {
            const wishlistKey = `wishlist_${currentUser}`;
            const savedWishlist = JSON.parse(localStorage.getItem(wishlistKey)) || [];
            setWishlist(savedWishlist); // 초기화
        }
    }, []);

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

    // 위시리스트 토글 함수
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
            // 위시리스트에서 제거
            updatedWishlist.splice(movieIndex, 1);
        } else {
            // 위시리스트에 추가
            updatedWishlist.push(movie);
        }

        localStorage.setItem(wishlistKey, JSON.stringify(updatedWishlist)); // 로컬 스토리지에 저장
        setWishlist(updatedWishlist); // 상태 업데이트
    };



    return (
        <div className="main-page">
            {bannerMovie && <Banner movie={bannerMovie} />}
            <MovieRow
                title="액션 영화"
                movies={actionMovies}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
            />
            <MovieRow
                title="코미디 영화"
                movies={comedyMovies}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
            />
            <MovieRow
                title="드라마 영화"
                movies={dramaMovies}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
            />
            {isLoading && <p className="loading">Loading...</p>}
        </div>
    );
};

export default MainPage;
