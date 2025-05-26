import axiosInstance from "../lib/api"
import { Department } from "../lib/types";

export const getDepartments = async (): Promise<Department[]> => {
  const response = await axiosInstance.get<Department[]>("/departments");
  return response.data;
};

