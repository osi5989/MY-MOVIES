// import React, { useState } from "react";

// export default function SearchBar({ onSearch }) {
//   const [inputValue, setInputValue] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (inputValue.trim() !== "") {
//       onSearch(inputValue.trim());
//       setInputValue("");
//     }
//   };

//   return (
//     <form className="search-form" onSubmit={handleSubmit}>
//       <input
//         type="text"
//         placeholder="חפש סרט..."
//         value={inputValue}
//         onChange={(e) => setInputValue(e.target.value)}
//       />
//       <button type="submit">חפש</button>
//     </form>
//   );
// }

// src/Components/SearchBar.jsx
import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      onSearch(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for a movie..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}

