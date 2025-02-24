"use client";

import React, { createContext, useState, useContext, useCallback } from "react";

interface CSVFileContextType {
  csvFile: File | null;
  updateCSVFile: (file: File | null) => void;
}

const CSVFileContext = createContext<CSVFileContextType | undefined>(undefined);

export const CSVFileProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [csvFile, setCSVFile] = useState<File | null>(null);

  const updateCSVFile = useCallback(
    (file: File | null) => {
      setCSVFile(file);
    },
    [setCSVFile]
  );

  return (
    <CSVFileContext.Provider
      value={{
        csvFile,
        updateCSVFile,
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
