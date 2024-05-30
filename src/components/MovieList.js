import React, { useState, useEffect, useCallback } from "react";
import { fetchMovies } from "../api";
import MovieCard from "./MovieCard";
import "./MovieList.css";
import { debounce } from "lodash";

const MovieList = ({ genres }) => {
  const [moviesByYear, setMoviesByYear] = useState({});
  const [years, setYears] = useState([2012]);
  const [isLoading, setIsLoading] = useState(false);
  const [atTop, setAtTop] = useState(false);

  const handleScroll = useCallback(
    debounce(() => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      const isTop = scrollTop === 0;
      setAtTop(isTop);

      const bottom = scrollTop + clientHeight >= scrollHeight - 50;

      if (bottom && !isLoading) {
        setYears((prevYears) => {
          const nextYear = Math.max(...prevYears) + 1;
          return prevYears.includes(nextYear)
            ? prevYears
            : [...prevYears, nextYear];
        });
      } else if (isTop && !isLoading) {
        setYears((prevYears) => {
          const prevYear = Math.min(...prevYears) - 1;
          return [prevYear, ...prevYears];
        });
      }
    }, 200),
    [isLoading]
  );

  const loadMovies = useCallback(
    async (year) => {
      setIsLoading(true);
      try {
        const response = await fetchMovies(year, genres);
        setMoviesByYear((prevMoviesByYear) => {
          const newMovies = response.data.results.filter(
            (movie) =>
              !prevMoviesByYear[year]?.some(
                (prevMovie) => prevMovie.id === movie.id
              )
          );

          return {
            ...prevMoviesByYear,
            [year]: atTop
              ? [...newMovies, ...(prevMoviesByYear[year] || [])]
              : [...(prevMoviesByYear[year] || []), ...newMovies],
          };
        });
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
      setIsLoading(false);
    },
    [genres, atTop]
  );

  useEffect(() => {
    setMoviesByYear({});
    // setYears([2012]);
    // loadMovies(2012);
  }, [genres]);

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
    <div className="movie-list">
      {years
        .sort((a, b) => a - b)
        .map((year) => (
          <div key={year} className="year-section">
            <h2>{year}</h2>
            <div className="movie-cards-container">
              {moviesByYear[year]?.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default MovieList;
