import { BACKEND_URL, ML_BACKEND_URL } from "@/lib/config";
import { ILogin, IUserRegister } from "@/types/auth";
import { ICompanyRegister } from "@/types/auth";
import { IJobPost } from "@/types/job";
import axios from "axios";

interface IJobPostfn extends IJobPost {
  token: string;
  companyId: number;
}

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

export const loginUser = async (form: ILogin) => {
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
};

export const verifyEmail = async (email: string) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/auth/send-verficationEmail`,
      {},
      {
        params: { email: email },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverMessage = error.response?.data?.message || error.message;
      throw new Error(serverMessage);
    }
    throw error;
  }
};

export const postJob = async (form: IJobPostfn) => {
  console.log("form", form);
  try {
    const finalForm: IJobPost = {
      jobTitle: form.jobTitle,
      jobDescription: form.jobDescription,
      jobAddress: form.jobAddress,
      jobLocation: form.jobLocation,
      salary: form.salary,
      jobType: form.jobType,
      categoryId: form.categoryId,
    };
    const response = await axios.post(
      `${BACKEND_URL}/job/${form.companyId}`,
      finalForm,
      {
        headers: {
          Authorization: `Bearer ${form.token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverMessage = error.response?.data?.message || error.message;
      throw new Error(serverMessage);
    }
    throw error;
  }
};

interface IATSRequest {
  resume_url: string;
  job_description: string;
}

interface IATSResponse {
  match_score: number;
  result: string;
  matched_keywords: string[];
}

export async function getATSScore(form: IATSRequest): Promise<IATSResponse> {
  try {
    const response = await axios.post(`${ML_BACKEND_URL}/api/match`, form);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverMessage = error.response?.data?.message || error.message;
      throw new Error(serverMessage);
    }
    throw error;
  }
}
