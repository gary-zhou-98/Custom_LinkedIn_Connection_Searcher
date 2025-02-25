"use client";

import React from "react";
import "@/styles/ConnectionsTable.css";
import { useCSVFile } from "@/context/CSVFileContext";
import { CSVData } from "@/context/CSVFileContext";

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
  let headers = Object.keys(csvData[0]);
  headers = ["index", ...headers];
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
          {csvData.map((row: CSVData, rowIndex: number) => (
            <tr key={rowIndex} className="table-row">
              {headers.map((header) =>
                header === "index" ? (
                  <td key={`${rowIndex}-${header}`} className="table-cell">
                    {rowIndex}
                  </td>
                ) : (
                  <td key={`${rowIndex}-${header}`} className="table-cell">
                    {row[header as keyof CSVData]}
                  </td>
                )
              )}
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
