"use client";

import React, { useState } from "react";
import "@/styles/ConnectionsTable.css";
import { useCSVFile } from "@/context/CSVFileContext";
import ConnectionsTableComponent from "./ConnectionsTableComponent";
import ConnectionsTableLoadingComponent from "./ConnctionsTableLoadingComponent";

type ViewMode = "all" | "filtered";

const ConnectionsTable = () => {
  const { csvData, filteredCSVData, isFiltering } = useCSVFile();
  const [viewMode, setViewMode] = useState<ViewMode>("all");

  if (isFiltering) {
    return <ConnectionsTableLoadingComponent />;
  }
  if (!csvData || csvData.length === 0) {
    return (
      <div className="table-empty-state">
        Please upload a CSV file to view the data
      </div>
    );
  }

  const showFilteredButton = filteredCSVData && filteredCSVData.length > 0;
  const currentData =
    viewMode === "filtered" && filteredCSVData ? filteredCSVData : csvData;

  return (
    <div className="table-view-container">
      <div className="table-view-controls">
        <button
          className={`view-toggle-button ${
            viewMode === "all" ? "selected" : ""
          }`}
          onClick={() => setViewMode("all")}
          disabled={viewMode === "all"}
        >
          Full Data
        </button>
        {showFilteredButton && (
          <button
            className={`view-toggle-button ${
              viewMode === "filtered" ? "selected" : ""
            }`}
            onClick={() => setViewMode("filtered")}
            disabled={viewMode === "filtered"}
          >
            Filtered Data
          </button>
        )}
      </div>
      <ConnectionsTableComponent data={currentData} />
    </div>
  );
};

export default ConnectionsTable;
