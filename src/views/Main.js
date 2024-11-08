import React, { useState, useEffect } from 'react';
import Banner from '../components/Home/Banner';
import MovieRow from '../components/Home/MovieRow';
import { fetchMovies } from '../util/Movie';
import axios from 'axios';
import { isLoggedIn } from '../util/Auth';

const MainPage = () => {
    const [bannerMovie, setBannerMovie] = useState(null);
    const [actionMovies, setActionMovies] = useState([]);
    const [comedyMovies, setComedyMovies] = useState([]);
    const [dramaMovies, setDramaMovies] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const venomResponse = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
                params: {
                    api_key: '11d7a828c0817b7c21bbb371349d3447',
                    query: '베놈: 라스트 댄스',
                },
            });

            if (venomResponse.data.results.length > 0) {
                setBannerMovie(venomResponse.data.results[0]);
            }

            const action = await fetchMovies('/discover/movie?with_genres=28');
            const comedy = await fetchMovies('/discover/movie?with_genres=35');
            const drama = await fetchMovies('/discover/movie?with_genres=18');

            setActionMovies(action);
            setComedyMovies(comedy);
            setDramaMovies(drama);
        };

        fetchData();
    }, []);

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

    return (
        <div>
            {bannerMovie && <Banner movie={bannerMovie} />}
            <MovieRow title="액션 영화" movies={actionMovies} onDoubleClick={handleDoubleClick} />
            <MovieRow title="코미디" movies={comedyMovies} onDoubleClick={handleDoubleClick} />
            <MovieRow title="드라마 영화" movies={dramaMovies} onDoubleClick={handleDoubleClick} />
        </div>
    );
};

export default MainPage;
