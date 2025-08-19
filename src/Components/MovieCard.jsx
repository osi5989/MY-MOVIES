
import React, { useState } from "react";
import StarRating from "./StarRating";

export default function MovieCard({ movie }) {
  const [userRating, setUserRating] = useState(0);

  const handleRate = (value) => {
    setUserRating(value);
  };

  return (
    <div className="movie-card">
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/220x330?text=No+Image"}
        alt={movie.Title}
      />
      <h3>{movie.Title} ({movie.Year})</h3>
      <p>{movie.Plot}</p>

      {/* דירוג משתמש */}
      <StarRating value={userRating} onRate={handleRate} />
      {userRating > 0 && <p>Your rating: {userRating} ⭐</p>}

      {/* שתי ביקורות חיצוניות */}
      <div className="external-ratings">
        {movie.Ratings?.slice(0, 2).map((r, idx) => (
          <p key={idx}>{r.Source}: {r.Value}</p>
        ))}
      </div>
    </div>
  );
}
