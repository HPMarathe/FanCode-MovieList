import React, { useState, useEffect } from "react";
import { fetchGenres } from "../api";
import "./GenreFilter.css";

const GenreFilter = ({ onSelectGenre }) => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    fetchGenres().then((response) => {
      setGenres(response.data.genres);
    });
  }, []);

  const handleGenreClick = (genreId) => {
    const updatedSelectedGenres = selectedGenres.includes(genreId)
      ? selectedGenres.filter((id) => id !== genreId)
      : [...selectedGenres, genreId];

    setSelectedGenres(updatedSelectedGenres);
    onSelectGenre(genreId);
  };

  return (
    <div className="genre-filter">
      {genres.map((genre) => (
        <button
          key={genre.id}
          className={selectedGenres.includes(genre.id) ? "selected" : ""}
          onClick={() => handleGenreClick(genre.id)}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
};

export default GenreFilter;
