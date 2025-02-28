import React from "react";
import "@/styles/ConnectionsTable.css";
const ConnectionsTableLoadingComponent = () => {
  return (
    <div className="table-loading-state">
      <div className="loading-spinner">
        <div className="loading-spinner-circle"></div>
      </div>
      <p>Filtering connections based on your criteria...</p>
    </div>
  );
};

export default ConnectionsTableLoadingComponent;
