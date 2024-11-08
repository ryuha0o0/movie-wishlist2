import axios from 'axios';

const API_KEY = '11d7a828c0817b7c21bbb371349d3447';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (endpoint, params = {}) => {
    try {
        const response = await axios.get(`${BASE_URL}${endpoint}`, {
            params: {
                api_key: API_KEY,
                ...params,
            },
        });
        return response.data.results;
    } catch (error) {
        console.error("Error fetching movies:", error);
        return [];
    }
};
