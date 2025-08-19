
import React, { useState } from "react";
import SearchBar from "./Components/SearchBar";
import MovieCard from "./Components/MovieCard";
import TopMovies from "./Components/TopMovies"; // ✅ הוספנו את קומפוננטת ההמלצות
import "./App.css";



const API_KEY = "6d841da8"; // OMDb API key שלך

export default function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async (query) => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
      );
      const data = await response.json();

      if (data.Search) {
        const detailedMovies = await Promise.all(
          data.Search.map(async (movie) => {
            const res = await fetch(
              `https://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}`
            );
            return res.json();
          })
        );
        setMovies(detailedMovies);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1 className="title">Movie Rating App</h1>

      {/* חיפוש סרטים (OMDb) */}
      <SearchBar onSearch={fetchMovies} />

      {loading && <p>Loading...</p>}

      {!loading && movies.length === 0 && (
        <p className="no-movies">No movies yet. Try searching above 👆</p>
      )}

      {movies.length > 0 && (
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}

      {/* 🔥 קומפוננטת ההמלצות (TMDb) */}
      <TopMovies />
    </div>
  );
}
