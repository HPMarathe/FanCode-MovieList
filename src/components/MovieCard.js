// src/components/MovieCard.js
import React, { useState, useEffect } from "react";
import { fetchMovieDetails } from "../api";
import "./MovieCard.css";

const MovieCard = ({ movie }) => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      const response = await fetchMovieDetails(movie.id);
      setDetails(response.data);
    };
    getMovieDetails();
  }, [movie.id]);

  if (!details) return <div>Loading...</div>;

  const genres = details.genres.map((genre) => genre.name).join(", ");
  const director = details.credits.crew.find(
    (person) => person.job === "Director"
  );
  const cast = details.credits.cast
    .slice(0, 5)
    .map((member) => member.name)
    .join(", ");

  return (
    <div className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.title}
      />
      <h3>{movie.title}</h3>
      <div className="movie-description">{movie.overview}</div>
      <p>
        <strong>Genres:</strong> {genres}
      </p>
      <p>
        <strong>Director:</strong> {director ? director.name : "N/A"}
      </p>
      <p>
        <strong>Cast:</strong> {cast}
      </p>
    </div>
  );
};

export default MovieCard;
