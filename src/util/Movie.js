import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';


export const fetchMovies = async (endpoint, apiKey, params = {}) => {
    try {
        const response = await axios.get(`${BASE_URL}${endpoint}`, {
            params: {
                api_key: apiKey,  // API_KEY를 여기서 직접 받아옵니다.
                ...params,
            },
        });
        return response.data.results;
    } catch (error) {
        console.error("Error fetching movies:", error);
        return [];
    }
};

