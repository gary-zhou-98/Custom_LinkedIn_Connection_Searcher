"use client";

import React from "react";
import "@/styles/SearchQueryInput.css";
import { useSearchQuery } from "@/context/SearchQueryContext";

const SearchQueryInput = () => {
  const { searchQuery, updateSearchQuery } = useSearchQuery();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    updateSearchQuery(newQuery);
  };

  const handleSubmit = () => {
    if (searchQuery.trim()) {
      console.log("Executing search with query:", searchQuery);
      // TODO: @gary-zhou-98 Invoke /api/filter endpoint to filter connections
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Enter your search query..."
        className="search-input"
        onKeyDown={(e) => {
          if (e.key === "Enter" && searchQuery.trim()) {
            handleSubmit();
          }
        }}
      />
      <button
        className="submit-button"
        onClick={handleSubmit}
        disabled={!searchQuery.trim()}
        aria-label="Execute search"
      >
        Search
      </button>
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
