import React, { useState } from "react";
import StarRating from "./StarRating";

export default function MovieCard({ movie }) {
  const [userRating, setUserRating] = useState(0);

  const handleRate = (value) => {
    setUserRating(value);
    console.log(`You rated ${movie.Title}: ${value} stars`);
  };

  return (
    <div className="movie-card">
      <img
        src={
          movie.Poster !== "N/A"
            ? movie.Poster
            : "https://via.placeholder.com/220x330?text=No+Image"
        }
        alt={movie.Title}
      />
      <div className="movie-info">
        <h3>
          {movie.Title} ({movie.Year})
        </h3>
        <p>{movie.Plot}</p>

        {/* דירוג משתמש */}
        <StarRating onRate={handleRate} />
        {userRating > 0 && <p>Your rating: {userRating} ⭐</p>}

        {/* דירוגים חיצוניים */}
        <div className="external-ratings">
          {movie.imdbRating && <p>IMDb: {movie.imdbRating}</p>}
          {movie.Ratings &&
            movie.Ratings.map((r, idx) => (
              <p key={idx}>
                {r.Source}: {r.Value}
              </p>
            ))}
        </div>
      </div>
    </div>
  );
}
