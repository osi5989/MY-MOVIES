// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

// import './App.css';

// function App() {
//   return (
//     <div className="app">
//       <h1>🎬 Movie Reviews</h1>
//       <p>ברוכים הבאים לאתר ביקורות הסרטים שלנו!</p>
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import StarRating from "./Components/StarRating.jsx";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);

  // טעינת סרטים מה-OMDb API
  useEffect(() => {
    const fetchMovies = async () => {
   const response = await fetch(
  `https://www.omdbapi.com/?s=marvel&apikey=6d841da8`
);

      const data = await response.json();
      console.log(data);

      if (data.Search) {
        const moviesWithRatings = await Promise.all(
          data.Search.map(async (m) => {
            const detailsRes = await fetch(
              `http://www.omdbapi.com/?i=tt3896198&apikey=6d841da8`
            );
            const details = await detailsRes.json();
            return {
              title: m.Title,
              year: m.Year,
              poster: m.Poster,
              imdbID: m.imdbID,
              rating: 0,
              review: details.Plot,
            };
          })
        );
        setMovies(moviesWithRatings);
      }
    };

    fetchMovies();
  }, []);

  const handleRate = (id, newRating) => {
    setMovies((prev) =>
      prev.map((movie) =>
        movie.imdbID === id ? { ...movie, rating: newRating } : movie
      )
    );
  };

  return (
    <div className="container">
      <h1 className="title">🎬 דירוג סרטים</h1>
      <div className="movies-grid">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie-card">
            <img src={movie.poster} alt={movie.title} />
            <h2>
              {movie.title} ({movie.year})
            </h2>
            <StarRating
              rating={movie.rating}
              onRate={(r) => handleRate(movie.imdbID, r)}
            />
            <p>{movie.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;


