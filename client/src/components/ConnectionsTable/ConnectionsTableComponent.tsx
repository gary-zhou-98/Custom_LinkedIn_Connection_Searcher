import React from "react";
import "@/styles/ConnectionsTable.css";
import { CSVData } from "@/context/CSVFileContext";
interface ConnectionsTableComponentProps {
  data: CSVData[];
}

const ConnectionsTableComponent = ({
  data,
}: ConnectionsTableComponentProps) => {
  // Get headers from the first object's keys
  let headers = Object.keys(data[0]);
  headers = ["index", ...headers];

  return (
    <div className="table-container">
      <table className="connections-table">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header} className="table-header" data-column={header}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row: CSVData, rowIndex: number) => (
            <tr key={rowIndex} className="table-row">
              {headers.map((header) =>
                header === "index" ? (
                  <td
                    key={`${rowIndex}-${header}`}
                    className="table-cell"
                    data-column={header}
                  >
                    {rowIndex}
                  </td>
                ) : (
                  <td
                    key={`${rowIndex}-${header}`}
                    className="table-cell"
                    data-column={header}
                  >
                    {row[header as keyof CSVData]}
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className="no-results">No matching results found</div>
      )}
    </div>
  );
};

export default ConnectionsTableComponent;
