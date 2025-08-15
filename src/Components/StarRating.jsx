import React, { useState } from "react";

export default function StarRating({ onRate }) {
  const [rating, setRating] = useState(0);

  const handleClick = (value) => {
    setRating(value);
    if (onRate) onRate(value);
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={star <= rating ? "star filled" : "star"}
          onClick={() => handleClick(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
}
