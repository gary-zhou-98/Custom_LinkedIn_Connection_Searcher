import axios from "axios";
import { CSVData } from "@/context/CSVFileContext";
const UPLOAD_API_URL = "http://localhost:5000/api/upload";

export async function uploadCSV(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(UPLOAD_API_URL, formData, {
      headers: {
        "Content-Type": "text/csv",
      },
    });

    return response.data as CSVData[];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Upload failed");
    }
    throw error;
  }
}
