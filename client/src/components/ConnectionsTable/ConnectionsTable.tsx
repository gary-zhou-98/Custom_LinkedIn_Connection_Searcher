"use client";

import React from "react";
import "@/styles/ConnectionsTable.css";
import { useCSVFile } from "@/context/CSVFileContext";

const ConnectionsTable = () => {
  const { csvData } = useCSVFile();

  if (!csvData || csvData.length === 0) {
    return (
      <div className="table-empty-state">
        Please upload a CSV file to view the data
      </div>
    );
  }

  // Get headers from the first object's keys
  const headers = Object.keys(csvData[0]);
  return (
    <div className="table-container">
      <table className="connections-table">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header} className="table-header">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {csvData.map((row, rowIndex) => (
            <tr key={rowIndex} className="table-row">
              {headers.map((header) => (
                <td key={`${rowIndex}-${header}`} className="table-cell">
                  {row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {csvData.length === 0 && (
        <div className="no-results">No matching results found</div>
      )}
    </div>
  );
};

export default ConnectionsTable;
