import axios from "axios";
import { BACKEND_URL } from "./config";
import { ICategoryResponse } from "@/types/auth";
import { JobPosting } from "@/types/job";

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

export async function getJobNyId(jobId: number) {
  try {
    const res = await axios.get(`${BACKEND_URL}/job/${jobId}`);
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

export async function getApplicationByJobId(jobId: number) {
  try {
    const res = await axios.get(`${BACKEND_URL}/application/job/${jobId}`);
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
