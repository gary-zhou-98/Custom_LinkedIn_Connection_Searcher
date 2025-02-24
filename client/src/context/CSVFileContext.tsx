"use client";

import React, { createContext, useState, useContext, useCallback } from "react";

export interface CSVData {
  [key: string]: string;
}

interface CSVFileContextType {
  csvFile: File | null;
  csvData: CSVData[] | null;
  updateCSVFile: (file: File | null) => void;
  updateCSVData: (data: CSVData[] | null) => void;
}

const CSVFileContext = createContext<CSVFileContextType | undefined>(undefined);

export const CSVFileProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [csvFile, setCSVFile] = useState<File | null>(null);
  const [csvData, setCSVData] = useState<CSVData[] | null>(null);
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

  return (
    <CSVFileContext.Provider
      value={{
        csvFile,
        csvData,
        updateCSVFile,
        updateCSVData,
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
