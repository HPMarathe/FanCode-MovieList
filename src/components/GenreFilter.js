// src/components/GenreFilter.js
import React, { useState, useEffect } from "react";
import { fetchGenres } from "../api";
import "./GenreFilter.css";

const GenreFilter = ({ onSelectGenre }) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetchGenres().then((response) => {
      setGenres(response.data.genres);
    });
  }, []);

  return (
    <div className="genre-filter">
      {genres.map((genre) => (
        <button key={genre.id} onClick={() => onSelectGenre(genre.id)}>
          {genre.name}
        </button>
      ))}
    </div>
  );
};

export default GenreFilter;
