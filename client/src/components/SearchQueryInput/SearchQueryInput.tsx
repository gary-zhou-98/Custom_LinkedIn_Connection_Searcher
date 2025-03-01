"use client";

import React from "react";
import "@/styles/SearchQueryInput.css";
import { useSearchQuery } from "@/context/SearchQueryContext";
import { filterConnections } from "@/api";
import { useCSVFile } from "@/context/CSVFileContext";
import chunkArray from "@/utils/batchCSVUtils";
import { CSVData } from "@/context/CSVFileContext";

const SearchQueryInput = () => {
  const { searchQuery, updateSearchQuery } = useSearchQuery();
  const { csvData, updateFilteredCSVData, updateIsFiltering } = useCSVFile();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    updateSearchQuery(newQuery);
  };

  const handleSubmit = async () => {
    if (searchQuery.trim()) {
      if (csvData) {
        updateIsFiltering(true);
        let allFilteredConnections: CSVData[] = [];
        for (const batch of chunkArray(csvData, 100)) {
          await filterConnections(batch, searchQuery.trim(), 25, 4)
            .then((filteredConnections) => {
              // TODO: @garyzhou display filtered result
              console.log("Filtered connections:", filteredConnections);
              allFilteredConnections =
                allFilteredConnections.concat(filteredConnections);
            })
            .catch((error) => {
              console.error("Error filtering connections:", error);
            });
        }
        updateFilteredCSVData(allFilteredConnections);
        updateIsFiltering(false);
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
