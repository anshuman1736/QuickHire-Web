import { BACKEND_URL } from "@/lib/config";
import {   IUserRegister } from "@/types/auth";
import axios from "axios";

export const RegisterUser = async (form: IUserRegister) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/auth/register`, form)
    if (response.data.STS >= 200 && response.data.STS < 300) {
      return response.data;
    } else {
      throw new Error(`Registration failed with status ${response.status}`);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverMessage = error.response?.data?.message || error.message;
      throw new Error(serverMessage);
    }
    throw error;
  }
};

