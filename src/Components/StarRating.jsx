

import React from "react";
import { FaStar } from "react-icons/fa";

export default function StarRating({ value = 0, onRate }) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="star-rating">
      {stars.map((star) => (
        <FaStar
          key={star}
          size={24}
          color={star <= value ? "#ffd700" : "#555"}
          style={{ cursor: "pointer", transition: "transform 0.2s, color 0.2s" }}
          onClick={() => onRate(star)}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.3)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          data-testid={`star-${star}`} // ✅ מאפשר לטסט למצוא את הכוכב
        />
      ))}
    </div>
  );
}
