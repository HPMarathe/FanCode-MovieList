import React, { useState, useEffect, useCallback } from "react";
import { fetchMovies } from "../api";
import MovieCard from "./MovieCard";
import "./MovieList.css";

const MovieList = ({ genres }) => {
  const [movies, setMovies] = useState([]);
  const [years, setYears] = useState([2012]);
  const [isLoading, setIsLoading] = useState(false);
  const [atTop, setAtTop] = useState(false); // State to track if we are at the top

  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    console.log(
      "Scroll Position -> Top:",
      scrollTop,
      "Height:",
      scrollHeight,
      "ClientHeight:",
      clientHeight
    );

    const isTop = scrollTop === 0;
    setAtTop(isTop); // Update the atTop state

    const bottom = scrollTop + clientHeight >= scrollHeight - 50;
    console.log("Top:", isTop, "Bottom:", bottom, "IsLoading:", isLoading);

    if (bottom && !isLoading) {
      setYears((prevYears) => {
        const nextYear = Math.max(...prevYears) + 1;
        console.log("Loading next year:", nextYear);
        return prevYears.includes(nextYear)
          ? prevYears
          : [...prevYears, nextYear];
      });
    } else if (isTop && !isLoading) {
      setYears((prevYears) => {
        const prevYear = Math.min(...prevYears) - 1;
        console.log("Loading previous year:", prevYear);
        return [prevYear, ...prevYears];
      });
    }
  }, [isLoading]);

  const loadMovies = useCallback(
    async (year) => {
      setIsLoading(true);
      try {
        console.log(year);
        const response = await fetchMovies(year, genres);
        setMovies((prevMovies) => {
          const newMovies = response.data.results.filter(
            (movie) =>
              !prevMovies.some((prevMovie) => prevMovie.id === movie.id)
          );
          return atTop
            ? [...newMovies, ...prevMovies]
            : [...prevMovies, ...newMovies];
        });
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
      setIsLoading(false);
    },
    [genres, atTop] // Depend on atTop
  );

  useEffect(() => {
    years.forEach((year) => {
      loadMovies(year);
    });
  }, [loadMovies, years]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <>
      <div>{years}</div>

      <div className="movie-list">
        {movies?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
        {isLoading && <p>Loading...</p>}
      </div>
    </>
  );
};

export default MovieList;
