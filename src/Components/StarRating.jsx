// import React from "react";

// function StarRating({ rating, onRate }) {
//   return (
//     <div className="star-rating">
//       {[1, 2, 3, 4, 5].map((star) => (
//         <span
//           key={star}
//           onClick={() => onRate(star)}
//           className={star <= rating ? "star filled" : "star"}
//         >
//           ★
//         </span>
//       ))}
//     </div>
//   );
// }

// export default StarRating;


// src/Components/StarRating.jsx
import React from "react";
import { FaStar } from "react-icons/fa";

export default function StarRating({ rating, onRate }) {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          size={24}
          color={star <= rating ? "#ffd700" : "#555"}
          style={{ cursor: "pointer" }}
          onClick={() => onRate(star)}
        />
      ))}
    </div>
  );
}
