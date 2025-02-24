"use client";

import React, { useState, useRef } from "react";
import "@/styles/FileUploader.css";
import { useCSVFile } from "@/context/CSVFileContext";

const FileUploader = () => {
  const { csvFile, updateCSVFile } = useCSVFile();
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (selectedFile: File) => {
    if (!selectedFile.name.toLowerCase().endsWith(".csv")) {
      alert("Please upload a CSV file");
      return;
    }

    const fileName = selectedFile.name;
    const cleanFileName = fileName.endsWith(".csv.csv")
      ? fileName.slice(0, -4)
      : fileName;

    const cleanedFile = new File([selectedFile], cleanFileName, {
      type: selectedFile.type,
      lastModified: selectedFile.lastModified,
    });

    updateCSVFile(cleanedFile);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    handleFileSelect(droppedFile);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFileSelect(selectedFile);
    }
  };

  return (
    <div
      className={`file-uploader ${isDragging ? "dragging" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInput}
        accept=".csv"
        className="hidden"
      />

      <div className="upload-content">
        {csvFile ? (
          <>
            <p className="file-name">{csvFile.name}</p>
            <button
              className="change-file-btn"
              onClick={(e) => {
                e.stopPropagation();
                updateCSVFile(null);
              }}
            >
              Choose different file
            </button>
          </>
        ) : (
          <>
            <svg
              className="upload-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="upload-text">
              Drag and drop your CSV file here, or click to select
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
