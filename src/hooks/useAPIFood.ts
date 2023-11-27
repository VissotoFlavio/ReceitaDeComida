import axios from "axios";
import { CategoryResponse, MealResponse } from "../interfaces/response";

const api = axios.create({
  baseURL: "https://themealdb.com/api/json/v1/1",
});

export const useAPIFood = () => ({
  getAllCategories: async (): Promise<CategoryResponse> => {
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

  getRecipesByCategory: async (category: string): Promise<MealResponse> => {
    if (!category) {
      return {
        meals: [],
      };
    }

    try {
      const response = await api.get<MealResponse>(`filter.php?c=${category}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
      throw error;
    }
  },
});
