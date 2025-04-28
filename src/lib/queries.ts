import axios from "axios";
import { BACKEND_URL, PYTHON_BACKEND_URL } from "./config";
import { ICategoryResponse } from "@/types/auth";
import {
  IFiterJobParams,
  JobApplication,
  JobPosting,
  MatchJobResponse,
} from "@/types/job";
import { UserProfile } from "@/types/user";

export async function getCatogory() {
  try {
    const response = await axios.get(`${BACKEND_URL}/category/`);

    if (response.data.STS === "200") {
      const data = response.data.CONTENT.map((category: ICategoryResponse) => {
        return {
          id: category.id,
          name: category.categoryName,
        };
      });

      return data;
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}

export async function getCatogoryById(categoryId: number) {
  try {
    const res = await axios.get(`${BACKEND_URL}/job/category/${categoryId}`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch category"
      );
    }
    throw new Error("An unexpected error occurred");
  }
}

export async function getJobById(jobId: number, token: string) {
  try {
    const res = await axios.get(`${BACKEND_URL}/job/${jobId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to fetch job");
    }
    throw new Error("An unexpected error occurred");
  }
}

export async function getAllJob() {
  try {
    const res = await axios.get(`${BACKEND_URL}/job`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch all jobs"
      );
    }
    throw new Error("An unexpected error occurred");
  }
}

export async function getEnableJob(): Promise<JobPosting[]> {
  try {
    const res = await axios.get(`${BACKEND_URL}/job/enabled`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("sessionId")}`,
      },
    });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch enabled jobs"
      );
    }
    throw new Error("An unexpected error occurred");
  }
}

export async function getRecomdedJob(
  userId: number
): Promise<MatchJobResponse[]> {
  try {
    const res = await axios.get(
      `${PYTHON_BACKEND_URL}/api/match-jobs-ai/${userId}`
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch recommended jobs"
      );
    }
    throw new Error("An unexpected error occurred");
  }
}

export async function enableApplicationJob() {
  try {
    const res = await axios.get(`${BACKEND_URL}/application/enabled`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch enabled applications"
      );
    }
    throw new Error("An unexpected error occurred");
  }
}

export async function getAllApplication() {
  try {
    const res = await axios.get(`${BACKEND_URL}/application`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch all applications"
      );
    }
    throw new Error("An unexpected error occurred");
  }
}

export async function getApplicationById(applicationId: number) {
  try {
    const res = await axios.get(`${BACKEND_URL}/application/${applicationId}`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch application"
      );
    }
    throw new Error("An unexpected error occurred");
  }
}

export async function getEnabledApplicationAndJob(jobId: number) {
  try {
    const res = await axios.get(
      `${BACKEND_URL}/application/enabled/job/${jobId}`
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          "Failed to fetch enabled applications for job"
      );
    }
    throw new Error("An unexpected error occurred");
  }
}

export async function getJobApplicationByStatus(
  jobId: number,
  status: boolean
) {
  try {
    const res = await axios.get(
      `${BACKEND_URL}/application/enabled/job/${jobId}/${status}`
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          "Failed to fetch applications by status"
      );
    }
    throw new Error("An unexpected error occurred");
  }
}

export async function getJobByCategory(categoryId: number) {
  try {
    const res = await axios.get(`${BACKEND_URL}/job/category/${categoryId}`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch jobs by category"
      );
    }
    throw new Error("An unexpected error occurred");
  }
}

interface IUserByIdResponse {
  STS: string;
  MSG: string;
  CONTENT: UserProfile;
}

export async function getUserById(
  userId: number,
  token: string
): Promise<IUserByIdResponse> {
  try {
    const res = await axios.get(`${BACKEND_URL}/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch user by ID"
      );
    }
    throw new Error("An unexpected error occurred");
  }
}

interface IJobByCompanyIdResponse {
  STS: string;
  MSG: string;
  CONTENT: JobPosting[];
}

export async function getJobByCompanyId(
  companyId: number,
  token: string
): Promise<IJobByCompanyIdResponse> {
  try {
    const res = await axios.get(
      `${BACKEND_URL}/job/getJobsByCompany/${companyId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch jobs by company ID"
      );
    }
    throw new Error("An unexpected error occurred");
  }
}

interface IApplicationByJobIdResponse {
  STS: string;
  MSG: string;
  CONTENT: JobApplication[];
}

export async function getApplicationByJobId(
  jobId: number,
  token: string
): Promise<IApplicationByJobIdResponse> {
  try {
    const res = await axios.get(
      `${BACKEND_URL}/application/enabled/job/${jobId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch applications for job"
      );
    }
    throw new Error("An unexpected error occurred");
  }
}

interface IJobByUserIdResponse {
  STS: string;
  MSG: string;
  CONTENT: JobApplication[];
}

export async function getAppliedJobs(
  userId: number,
  token: string
): Promise<IJobByUserIdResponse> {
  try {
    const res = await axios.get(`${BACKEND_URL}/application/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          "Failed to fetch Applied jobs by user ID"
      );
    }
    throw new Error("An unexpected error occurred");
  }
}

export async function getFilteredJob(searchParams: IFiterJobParams) {
  try {
    const response = await axios.get(`${BACKEND_URL}/home/filterJobs`, {
      params: searchParams,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          "Failed to fetch Applied jobs by user ID"
      );
    }
    throw new Error("An unexpected error occurred");
  }
}
