"use client";

import React from "react";
import "@/styles/ConnectionsTable.css";
import { useCSVFile } from "@/context/CSVFileContext";
import ConnectionsTableElement from "./ConnectionsTableElement";

const ConnectionsTable = () => {
  const { csvData, filteredCSVData } = useCSVFile();

  if (!filteredCSVData || filteredCSVData.length === 0) {
    if (!csvData || csvData.length === 0) {
      return (
        <div className="table-empty-state">
          Please upload a CSV file to view the data
        </div>
      );
    }
    return <ConnectionsTableElement data={csvData} />;
  }

  return <ConnectionsTableElement data={filteredCSVData} />;
};

export default ConnectionsTable;
