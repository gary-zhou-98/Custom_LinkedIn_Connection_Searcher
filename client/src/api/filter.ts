import axios from "axios";

import { CSVData } from "@/context/CSVFileContext";

const FILTER_API_URL = "http://localhost:5000/api/filter";

interface FilterRequest {
  connections: CSVData[];
  criteria: string;
}

export async function filterConnections(
  connections: CSVData[],
  criteria: string
) {
  try {
    const requestBody: FilterRequest = {
      connections,
      criteria,
    };

    const response = await axios.post(FILTER_API_URL, requestBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Filtering failed");
    }
    throw error;
  }
}
