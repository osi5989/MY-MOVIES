// import React, { useState, useEffect } from "react";
// import SearchBar from "./Components/SearchBar";
// import MovieCard from "./Components/MovieCard";
// import "./App.css";

// function App() {
//   const [movies, setMovies] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchMovies = async (query) => {
//     if (!query) return;
//     setLoading(true);
//     try {
//       const response = await fetch(
//         `https://www.omdbapi.com/?s=${query}&apikey=6d841da8`
//       );
//       const data = await response.json();
//       if (data.Search) {
//         const moviesWithRatings = await Promise.all(
//           data.Search.map(async (m) => {
//             const detailsRes = await fetch(
//               `https://www.omdbapi.com/?i=${m.imdbID}&apikey=6d841da8`
//             );
//             const details = await detailsRes.json();
//             return {
//               title: m.Title,
//               year: m.Year,
//               poster: m.Poster,
//               imdbID: m.imdbID,
//               rating: 0,
//               review: details.Plot,
//             };
//           })
//         );
//         setMovies(moviesWithRatings);
//       } else {
//         setMovies([]);
//       }
//     } catch (error) {
//       console.error("Error fetching movies:", error);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchMovies("batman");
//   }, []);

//   const handleRate = (id, newRating) => {
//     setMovies((prev) =>
//       prev.map((movie) =>
//         movie.imdbID === id ? { ...movie, rating: newRating } : movie
//       )
//     );
//   };

//   return (
//     <div className="container">
//       <h1 className="title">Movie rating🎬</h1>
//       <SearchBar onSearch={fetchMovies} />

//       {loading && <p>loading movies ...</p>}

//       <div className="movies-grid">
//         {movies.map((movie) => (
//           <MovieCard key={movie.imdbID} movie={movie} onRate={handleRate} />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";
import SearchBar from "./Components/SearchBar";
import MovieCard from "./Components/MovieCard";
import "./App.css";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async (query) => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${query}&apikey=6d841da8`
      );
      const data = await response.json();
      if (data.Search) {
        const moviesWithRatings = await Promise.all(
          data.Search.map(async (m) => {
            const detailsRes = await fetch(
              `https://www.omdbapi.com/?i=${m.imdbID}&apikey=6d841da8`
            );
            const details = await detailsRes.json();
            return {
              title: m.Title,
              year: m.Year,
              poster: m.Poster !== "N/A" ? m.Poster : "https://via.placeholder.com/300x450?text=No+Image",
              imdbID: m.imdbID,
              rating: 0,
              review: details.Plot,
            };
          })
        );
        setMovies(moviesWithRatings);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]);
    }
    setLoading(false);
  };

  const handleRate = (id, newRating) => {
    setMovies((prev) =>
      prev.map((movie) =>
        movie.imdbID === id ? { ...movie, rating: newRating } : movie
      )
    );
  };

  return (
    <div className="container">
      <h1 className="title">🎬 Movie Ratings</h1>
      <SearchBar onSearch={fetchMovies} />

      {loading && <p>Loading movies...</p>}

      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} onRate={handleRate} />
        ))}
      </div>
    </div>
  );
}
