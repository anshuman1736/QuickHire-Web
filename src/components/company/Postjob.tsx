"use client";
import { postJob } from "@/lib/postData";
import { IJobPost } from "@/types/job";
import { jobPostSchema } from "@/types/schema";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const Postjob = () => {
  const [jobData, setJobdata] = useState({
    jobTitle: "",
    jobDescription: "",
    jobAddress: "",
    jobLocation: "",
    salary: "",
    jobType: "",
    categoryId: 0,
  });

  const jobMutation = useMutation({
    mutationFn: postJob,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error("Error posting job:", error);
    },
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setJobdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOnsubmitData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: IJobPost = {
      jobTitle: jobData.jobTitle,
      jobDescription: jobData.jobDescription,
      jobAddress: jobData.jobAddress,
      jobLocation: jobData.jobLocation,
      salary: jobData.salary,
      jobType: jobData.jobType,
      categoryId: jobData.categoryId,
    };

    const token = localStorage.getItem("token");
    const companyId = localStorage.getItem("companyId");

    const inputData = jobPostSchema.safeParse(data);

    if (!inputData.success) {
      console.log(inputData.error.format());
      return;
    }

    const finalData = {
      ...inputData.data,
      token: token as string,
      companyId: Number(companyId),
    };

    jobMutation.mutate(finalData);
  };

  return (
    <div className="h-full bg-white py-18 bg-gradient-to-r from-blue-100 to-white">
      <form
        onSubmit={handleOnsubmitData}
        className="flex items-center flex-col justify-center"
      >
        <div className="px-5 w-2/3 p-5 space-y-4 rounded-tl-4xl rounded-sm border-blue-300 border-8">
          <h2 className="text-center font-bold text-2xl text-gray-700">
            Create New Job
          </h2>

          <div className="flex flex-col gap-2">
            <label htmlFor="jobTitle">Job Title</label>
            <input
              id="jobTitle"
              name="jobTitle"
              value={jobData.jobTitle}
              onChange={handleChange}
              className="outline-none bg-gray-200 border px-3 py-2 rounded-lg text-sm  "
              type="text"
              placeholder="ex-Android Dev"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="jobDescription"> Enter Job Description</label>
            <textarea
              id="jobDescription"
              rows={5}
              name="jobDescription"
              value={jobData.jobDescription}
              onChange={handleChange}
              className="outline-none px-3 py-2 bg-gray-200 rounded-lg text-sm border"
              placeholder="Detail info about job title"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="jobAddress"> Enter Job Address</label>
            <input
              id="jobAddress"
              name="jobAddress"
              value={jobData.jobAddress}
              onChange={handleChange}
              className="outline-none px-3 py-2 bg-gray-200 rounded-lg text-sm border"
              type="text"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="jobLocation">Job Location</label>
            <input
              id="jobLocation"
              name="jobLocation"
              value={jobData.jobLocation}
              onChange={handleChange}
              className="outline-none px-3 py-2 bg-gray-200 rounded-lg text-sm border"
              type="text"
            />
          </div>

          <div className="flex flex-col gap-2 relative">
          <span className="absolute left-3 top-2/3 -translate-y-1/2 text-gray-500">₹</span>
            <label htmlFor="salary">Annual Salary</label>
            <input
              id="salary"
              name="salary"
              placeholder=""
              value={jobData.salary}
              onChange={handleChange}
              className="outline-none px-3 pl-7 bg-gray-200 py-2 rounded-lg text-sm border"
              type="text"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="jobType">Job Type</label>
            <select
              id="jobType"
              name="jobType"
              value={jobData.jobType}
              onChange={handleChange}
              className="w-[20%] rounded-lg bg-gray-100 border px-3 py-2"
            >
              <option value="" disabled>
                Select Job Type
              </option>
              <option value="Remote">Remote</option>
              <option value="Location">Location</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-gray-200 px-20 py-2 font-bold rounded-lg hover:bg-blue-700 transaction-all duration-300 cursor-pointer"
            >
              Publish Job
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Postjob;
