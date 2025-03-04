import axios from "axios";

import { CSVData } from "@/context/CSVFileContext";
import { config } from "../config/env";

interface FilterRequest {
  connections: CSVData[];
  criteria: string;
  batchSize: number;
  concurrencyLimit: number;
}

export async function filterConnections(
  connections: CSVData[],
  criteria: string,
  batchSize: number,
  concurrencyLimit: number
) {
  try {
    const requestBody: FilterRequest = {
      connections,
      criteria,
      batchSize,
      concurrencyLimit,
    };

    const response = await axios.post(`${config.apiUrl}/filter`, requestBody, {
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
