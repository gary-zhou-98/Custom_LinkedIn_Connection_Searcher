"use client";

import React from "react";
import "@/styles/SearchQueryInput.css";

const SearchQueryInput = () => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    console.log(newQuery);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={""}
        onChange={handleInputChange}
        placeholder="Enter your search query..."
        className="search-input"
      />
      {true && (
        <button
          className="clear-button"
          onClick={() => {}}
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default SearchQueryInput;
