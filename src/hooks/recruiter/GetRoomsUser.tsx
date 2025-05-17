import { BACKEND_URL } from "@/lib/config";
import axios from "axios";

export const GetUserRooms = async (companyId: string) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/chat/userRooms/${companyId}`);
    if (response.data.STS >= 200 && response.data.STS < 300) {
      return response.data;
      console.log(response.data);
    } else {
      throw new Error(`Failed to fetch company rooms with status ${response.status}`);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverMessage = error.response?.data?.message || error.message;
      throw new Error(serverMessage);
    }
    throw error;
  }
}