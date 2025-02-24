"use client";

import { useEffect } from "react";
import Header from "@/components/Header/Header";
import FileUploader from "@/components/FileUploader/FileUploader";
import SearchQueryInput from "@/components/SearchQueryInput/SearchQueryInput";
import ConnectionsTable from "@/components/ConnectionsTable/ConnectionsTable";
import { uploadCSV } from "@/api";
import { useCSVFile } from "@/context/CSVFileContext";

export default function Home() {
  const { csvFile, updateCSVData } = useCSVFile();

  useEffect(() => {
    if (csvFile) {
      try {
        uploadCSV(csvFile).then((data) => {
          console.log(data.data);
          updateCSVData(data.data);
        });
      } catch (error) {
        console.error(error);
      }
    }
  }, [csvFile, updateCSVData]);

  return (
    <div className="page-container">
      <Header />
      <main className="main-content">
        <SearchQueryInput />
        <ConnectionsTable />
        <FileUploader />
      </main>
    </div>
  );
}
