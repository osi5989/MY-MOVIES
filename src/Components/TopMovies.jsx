import React, { useState } from "react";

const API_KEY = "765a93e1b3f478529b9aacd12c6f3523";

export default function TopMovies() {
  const [show, setShow] = useState(false);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleToggle = async () => {
    if (!show) {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
        );
        const data = await res.json();
        const topMovies = data.results.slice(0, 4);

        // להביא ביקורות לכל סרט
        const moviesWithReviews = await Promise.all(
          topMovies.map(async (movie) => {
            try {
              const reviewRes = await fetch(
                `https://api.themoviedb.org/3/movie/${movie.id}/reviews?api_key=${API_KEY}&language=en-US&page=1`
              );
              const reviewData = await reviewRes.json();
              return {
                ...movie,
                reviews: reviewData.results.slice(0, 2), // שתי ביקורות ראשונות
              };
            } catch (err) {
              return { ...movie, reviews: [] };
            }
          })
        );

        setMovies(moviesWithReviews);
      } catch (err) {
        console.error(err);
        setError("Error fetching movies.");
      } finally {
        setLoading(false);
      }
    }
    setShow(!show);
  };

  return (
    <div style={{ marginTop: "40px" }}>
      <button
        onClick={handleToggle}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          borderRadius: "5px",
          backgroundColor: "#444",
          color: "white",
          border: "none",
          marginBottom: "20px",
        }}
      >
        {show ? "Hide Top Movies" : "Show Top Movies"}
      </button>

      {show && (
        <div>
          {loading && <p>Loading movies...</p>}
          {error && <p>{error}</p>}
          <div className="movie-grid">
            {movies.map((movie) => (
              <div key={movie.id} className="movie-card">
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w220_and_h330_face${movie.poster_path}`
                      : "https://via.placeholder.com/220x330?text=No+Image"
                  }
                  alt={movie.title}
                />
                <h3>
                  {movie.title} ({movie.release_date?.slice(0, 4)})
                </h3>
                <p>Rating: {movie.vote_average}/10</p>
                <p style={{ fontSize: "14px", color: "#ccc" }}>
                  {movie.overview}
                </p>

                {/* ביקורות */}
                {movie.reviews && movie.reviews.length > 0 && (
                  <div style={{ marginTop: "10px", textAlign: "left" }}>
                    <h4 style={{ fontSize: "1rem", color: "#7f5af0" }}>
                      Reviews:
                    </h4>
                    {movie.reviews.map((rev) => (
                      <p
                        key={rev.id}
                        style={{
                          fontSize: "0.9rem",
                          color: "#ddd",
                          borderLeft: "3px solid #7f5af0",
                          paddingLeft: "8px",
                          marginBottom: "8px",
                        }}
                      >
                        <strong>{rev.author}</strong>:{" "}
                        {rev.content.slice(0, 120)}...
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
