import React, { useState, useEffect } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    console.info("SearchBar component mounted");
  }, []);

  const MAX_LENGTH = 40;
  const forbiddenPattern = /[<>\\\/"'`;]/g; // forbidden characters

  const handleChange = (e) => {
    let value = e.target.value;

    // Check for forbidden characters
    if (forbiddenPattern.test(value)) {
      alert("Forbidden characters are not allowed: < > \\ / \" ' ` ;");
      value = value.replace(forbiddenPattern, ""); // remove them
    }

    // Check length
    if (value.length > MAX_LENGTH) {
      alert(`You can only enter up to ${MAX_LENGTH} characters!`);
      value = value.slice(0, MAX_LENGTH); // trim to max
    }

    setQuery(value);
    console.debug(`Query changed: "${value}"`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      console.info("Fetching movies from API...");
      console.log(`Submitting search query: "${query.trim()}"`);
      onSearch(query.trim());
    } else {
      console.warn("Search query is empty, nothing to submit");
      alert("Search query cannot be empty!");
    }
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={handleChange}
        maxLength={MAX_LENGTH} // safeguard
      />
      <button type="submit">Search</button>
    </form>
  );
}
