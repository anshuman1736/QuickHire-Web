import { BACKEND_URL } from "@/lib/config";
import { ILogin, IUserRegister } from "@/types/auth";
import { ICompanyRegister } from "@/types/auth";
import axios from "axios";

export const RegisterUser = async (form: IUserRegister) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/auth/register`, form);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverMessage = error.response?.data?.message || error.message;
      throw new Error(serverMessage);
    }
    throw error;
  }
};

export const RegisterCompany = async (form: ICompanyRegister) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/auth/company/register`,
      form
    );
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};


export const loginUser = async(form: ILogin) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/auth/login`, form);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverMessage = error.response?.data?.message || error.message;
      throw new Error(serverMessage);
    }
    throw error;
  }
}