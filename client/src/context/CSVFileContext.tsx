"use client";

import React, { createContext, useState, useContext, useCallback } from "react";

export interface CSVData {
  "First Name": string;
  "Last Name": string;
  "Email Address": string;
  URL: string;
  Company: string;
  Position: string;
}

interface CSVFileContextType {
  csvFile: File | null;
  csvData: CSVData[] | null;
  filteredCSVData: CSVData[] | null;
  updateCSVFile: (file: File | null) => void;
  updateCSVData: (data: CSVData[] | null) => void;
  updateFilteredCSVData: (data: CSVData[] | null) => void;
}

const CSVFileContext = createContext<CSVFileContextType | undefined>(undefined);

export const CSVFileProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [csvFile, setCSVFile] = useState<File | null>(null);
  const [csvData, setCSVData] = useState<CSVData[] | null>(null);
  const [filteredCSVData, setFilteredCSVData] = useState<CSVData[] | null>(
    null
  );
  const updateCSVFile = useCallback(
    (file: File | null) => {
      setCSVFile(file);
    },
    [setCSVFile]
  );

  const updateCSVData = useCallback(
    (data: CSVData[] | null) => {
      setCSVData(data);
    },
    [setCSVData]
  );

  const updateFilteredCSVData = useCallback(
    (data: CSVData[] | null) => {
      setFilteredCSVData(data);
    },
    [setFilteredCSVData]
  );
  return (
    <CSVFileContext.Provider
      value={{
        csvFile,
        csvData,
        filteredCSVData,
        updateCSVFile,
        updateCSVData,
        updateFilteredCSVData,
      }}
    >
      {children}
    </CSVFileContext.Provider>
  );
};

export const useCSVFile = () => {
  const context = useContext(CSVFileContext);
  if (context === undefined) {
    throw new Error("useCSVFile must be used within a CSVFileProvider");
  }
  return context;
};
