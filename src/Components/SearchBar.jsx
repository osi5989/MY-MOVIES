
import React, { useState, useEffect } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  // מופיע פעם אחת כשהקומפוננטה עולה
  useEffect(() => {
    console.info("SearchBar component mounted");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      // לוג שמראה שהתחיל החיפוש
      console.info("Fetching movies from API...");
      // מראה מה המשתמש שלח לחיפוש
      console.log(`Submitting search query: "${query.trim()}"`);
      onSearch(query.trim());
    } else {
      // מזהיר אם השדה ריק
      console.warn("Search query is empty, nothing to submit");
    }
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          // מראה בזמן אמת את השינויים בשדה החיפוש
          console.debug(`Query changed: "${e.target.value}"`);
        }}
      />
      <button type="submit">Search</button>
    </form>
  );
}

