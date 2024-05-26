// src/api/index.js
import axios from "axios";

const API_KEY = "2dca580c2a14b55200e784d157207b4d";
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = (year, genres) => {
  const genreQuery = genres.length ? `&with_genres=${genres.join(",")}` : "";
  return axios.get(`${BASE_URL}/discover/movie`, {
    params: {
      api_key: API_KEY,
      sort_by: "popularity.desc",
      primary_release_year: year,
      vote_count: "gte=100",
      page: 1,
    },
  });
};

export const fetchGenres = () => {
  return axios.get(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
};

export const fetchMovieDetails = (movieId) => {
  return axios.get(`${BASE_URL}/movie/${movieId}`, {
    params: {
      api_key: API_KEY,
      append_to_response: "credits",
    },
  });
};
