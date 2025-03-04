import axios from "axios";
import { config } from "../config/env";
export async function uploadCSV(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(`${config.apiUrl}/upload`, formData, {
      headers: {
        "Content-Type": "text/csv",
      },
    });

    const csvData = response.data.data;

    return csvData;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Upload failed");
    }
    throw error;
  }
}
