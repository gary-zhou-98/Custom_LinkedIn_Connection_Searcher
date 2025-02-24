"use client";

import { useEffect } from "react";
import Header from "../components/Header/Header";
import FileUploader from "../components/FileUploader/FileUploader";
import SearchQueryInput from "../components/SearchQueryInput/SearchQueryInput";
import { uploadCSV } from "@/api";
import { useCSVFile } from "@/context/CSVFileContext";
export default function Home() {
  const { csvFile } = useCSVFile();

  useEffect(() => {
    if (csvFile) {
      try {
        uploadCSV(csvFile).then((data) => {
          console.log(data);
        });
      } catch (error) {
        console.error(error);
      }
    }
  }, [csvFile]);

  return (
    <div className="page-container">
      <Header />
      <main className="main-content">
        <SearchQueryInput />
        <FileUploader />
      </main>
    </div>
  );
}
