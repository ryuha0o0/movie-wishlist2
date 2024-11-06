import React, { useState, useEffect } from 'react';
import { fetchMovies } from '../../util/Movie';
import './Search.css';

function Search() {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [actionMovies, setActionMovies] = useState([]);
    const [comedyMovies, setComedyMovies] = useState([]);
    const [horrorMovies, setHorrorMovies] = useState([]);

    useEffect(() => {
        // Fetch recommended movies for each genre on initial load
        const loadRecommendedMovies = async () => {
            const action = await fetchMovies('/discover/movie?with_genres=28');
            const comedy = await fetchMovies('/discover/movie?with_genres=35');
            const horror = await fetchMovies('/discover/movie?with_genres=27');
            setActionMovies(action);
            setComedyMovies(comedy);
            setHorrorMovies(horror);
        };
        loadRecommendedMovies();
    }, []);

    const handleSearch = async () => {
        if (query.trim()) {
            const searchResults = await fetchMovies(`/search/movie?query=${query}`);
            setMovies(searchResults);
        }
    };

    const renderMoviesGrid = (moviesList) => (
        <div className="movies-grid">
            {moviesList.map((movie) => (
                <div key={movie.id} className="movie-card">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                    />
                    <h3>{movie.title}</h3>
                </div>
            ))}
        </div>
    );

    return (
        <div className="search">
            <h2>Search Movies</h2>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Enter movie title..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            {query.trim() ? (
                // Show search results if there is a query
                renderMoviesGrid(movies)
            ) : (
                // Show recommended movies by genre if no search has been performed
                <>
                    <h3>Recommended Action Movies</h3>
                    {renderMoviesGrid(actionMovies.slice(0, 8))}
                    <h3>Recommended Comedy Movies</h3>
                    {renderMoviesGrid(comedyMovies.slice(0, 8))}
                    <h3>Recommended Horror Movies</h3>
                    {renderMoviesGrid(horrorMovies.slice(0, 8))}
                </>
            )}
        </div>
    );
}

export default Search;
