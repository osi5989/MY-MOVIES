import React from "react";

function StarRating({ rating, onRate }) {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => onRate(star)}
          className={star <= rating ? "star filled" : "star"}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default StarRating;
