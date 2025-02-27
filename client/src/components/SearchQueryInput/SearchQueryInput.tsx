"use client";

import React from "react";
import "@/styles/SearchQueryInput.css";
import { useSearchQuery } from "@/context/SearchQueryContext";
import { filterConnections } from "@/api";
import { useCSVFile } from "@/context/CSVFileContext";

const SearchQueryInput = () => {
  const { searchQuery, updateSearchQuery } = useSearchQuery();
  const { csvData } = useCSVFile();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    updateSearchQuery(newQuery);
  };

  const handleSubmit = () => {
    if (searchQuery.trim()) {
      if (csvData) {
        filterConnections(csvData, searchQuery.trim())
          .then((filteredConnections) => {
            // TODO: @garyzhou display filtered result
            console.log("Filtered connections:", filteredConnections);
          })
          .catch((error) => {
            console.error("Error filtering connections:", error);
          });
      } else {
        alert("Upload a CSV file first");
      }
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
