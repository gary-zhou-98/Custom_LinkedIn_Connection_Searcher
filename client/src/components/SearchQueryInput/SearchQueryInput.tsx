"use client";

import React from "react";
import "@/styles/SearchQueryInput.css";
import { useSearchQuery } from "@/context/SearchQueryContext";

const SearchQueryInput = () => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    updateSearchQuery(newQuery);
  };
  const { searchQuery, updateSearchQuery } = useSearchQuery();

  return (
    <div className="search-container">
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Enter your search query..."
        className="search-input"
      />
      {searchQuery.length > 0 && (
        <button
          className="clear-button"
          onClick={() => updateSearchQuery("")}
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default SearchQueryInput;
