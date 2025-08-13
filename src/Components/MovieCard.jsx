// import React from "react";
// import { motion } from "framer-motion";

// import StarRating from "./StarRating.jsx";


// export default function MovieCard({ movie, onRate }) {
//   return (
//     <motion.div
//       className="movie-card"
//       initial={{ opacity: 0, y: -50 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <img src={movie.poster} alt={movie.title} />
//       <h3>{movie.title}</h3>
//       <p>{movie.year}</p>
//       <StarRating rating={movie.rating} onRate={(r) => onRate(movie.imdbID, r)} />
//       <p>{movie.review}</p>
//     </motion.div>
//   );
// }


import React from "react";
import { motion } from "framer-motion";
import StarRating from "./StarRating.jsx";

export default function MovieCard({ movie, onRate }) {
  return (
    <motion.div
      className="movie-card"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <img src={movie.poster} alt={movie.title} />
      <h3>{movie.title}</h3>
      <p>{movie.year}</p>
      <StarRating rating={movie.rating} onRate={(r) => onRate(movie.imdbID, r)} />
      <p>{movie.review}</p>
    </motion.div>
  );
}
