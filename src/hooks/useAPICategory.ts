import axios from "axios";
import { CategoryResponse } from "../interfaces/response";

const api = axios.create({
  baseURL: "https://themealdb.com/api/json/v1/1",
});

export const useAPICategory = () => ({
  getAll: async (): Promise<CategoryResponse> => {
    try {
      const response = await api.get<CategoryResponse>("/categories.php");
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
      throw error;
    }
  },
});
