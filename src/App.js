import React, { useState } from "react";
import MovieList from "./components/MovieList";
import GenreFilter from "./components/GenreFilter";
import "./App.css";

function App() {
  const [selectedGenres, setSelectedGenres] = useState([]);

  const handleSelectGenre = (genreId) => {
    setSelectedGenres((prevGenres) => {
      if (prevGenres.includes(genreId)) {
        return prevGenres.filter((id) => id !== genreId);
      } else {
        return [...prevGenres, genreId];
      }
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>MovieFix</h1>
        <GenreFilter onSelectGenre={handleSelectGenre} />
      </header>
      <MovieList genres={selectedGenres} />
    </div>
  );
}

export default App;
