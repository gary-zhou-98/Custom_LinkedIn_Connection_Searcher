"use client";

import React from "react";
import "@/styles/ConnectionsTable.css";
import { useCSVFile } from "@/context/CSVFileContext";
import ConnectionsTableComponent from "./ConnectionsTableComponent";
import ConnectionsTableLoadingComponent from "./ConnctionsTableLoadingComponent";

const ConnectionsTable = () => {
  const { csvData, filteredCSVData, isFiltering } = useCSVFile();

  if (isFiltering) {
    return <ConnectionsTableLoadingComponent />;
  }

  if (!filteredCSVData || filteredCSVData.length === 0) {
    if (!csvData || csvData.length === 0) {
      return (
        <div className="table-empty-state">
          Please upload a CSV file to view the data
        </div>
      );
    }
    return <ConnectionsTableComponent data={csvData} />;
  }

  return <ConnectionsTableComponent data={filteredCSVData} />;
};

export default ConnectionsTable;
