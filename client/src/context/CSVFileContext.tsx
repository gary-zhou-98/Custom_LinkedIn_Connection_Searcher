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
  isFiltering: boolean;
  updateCSVFile: (file: File | null) => void;
  updateCSVData: (data: CSVData[] | null) => void;
  updateFilteredCSVData: (data: CSVData[] | null) => void;
  updateIsFiltering: (isFiltering: boolean) => void;
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
  const [isFiltering, setIsFiltering] = useState<boolean>(false);
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
      if (data) {
        setFilteredCSVData((prev) => {
          if (prev) {
            return [...prev, ...data];
          } else {
            return data;
          }
        });
      }
    },
    [setFilteredCSVData]
  );

  const updateIsFiltering = useCallback(
    (isFiltering: boolean) => {
      setIsFiltering(isFiltering);
    },
    [setIsFiltering]
  );

  return (
    <CSVFileContext.Provider
      value={{
        csvFile,
        csvData,
        filteredCSVData,
        isFiltering,
        updateCSVFile,
        updateCSVData,
        updateFilteredCSVData,
        updateIsFiltering,
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
