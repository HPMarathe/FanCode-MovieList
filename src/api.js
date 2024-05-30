// src/api/index.js
import axios from "axios";
// https://api.themoviedb.org/3//discover/movie

// https://api.themoviedb.org/3/discover/movie?api_key=2dca580c2a14b55200e784d157207b4d&sort_by=popularity.desc&primary_release_year=2023&page=1&vot
// e_count.gte=100&with_genres=37
const API_KEY = "2dca580c2a14b55200e784d157207b4d";
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = (year, genres) => {
  const genreQuery = genres.length ? `${genres}` : "";
  console.log(genreQuery);
  return axios.get(`${BASE_URL}/discover/movie`, {
    params: {
      api_key: API_KEY,
      sort_by: "popularity.desc",
      primary_release_year: year,
      vote_count: "gte=100",
      // page: 1,
      with_genres: genreQuery, // Add the genre query
    },
  });
};

export const fetchMovieDetails = (movieId) => {
  return axios.get(`${BASE_URL}/movie/${movieId}`, {
    params: {
      api_key: API_KEY,
      append_to_response: "credits",
    },
  });
};

export const fetchGenres = () => {
  return axios.get(`${BASE_URL}/genre/movie/list`, {
    params: {
      api_key: API_KEY,
    },
  });
};
