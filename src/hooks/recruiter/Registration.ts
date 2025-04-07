import { BACKEND_URL } from "@/lib/config";
import {  ICompanyRegister} from "@/types/auth";
import axios from "axios";


export const RegisterCompany = async (form: ICompanyRegister) => {

    try {
      const response = await axios.post(`${BACKEND_URL}/auth/company/register`, form);
      console.log("Registration response:", BACKEND_URL);
      return response.data;
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  };
  