"use client";
import { BACKEND_URL } from "@/lib/config";
import { postJob } from "@/lib/postData";
import { successToast } from "@/lib/toast";
import { ICategory, ICategoryResponse } from "@/types/auth";
import { IJobPost } from "@/types/job";
import { jobPostSchema } from "@/types/schema";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

const Postjob = () => {
  const [jobData, setJobdata] = useState({
    jobTitle: "",
    jobDescription: "",
    jobAddress: "",
    jobLocation: "",
    salary: "",
    jobType: "",
    categoryId: 0,
    categoryName: "",
  });
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [categoryOpen, setCategoryOpen] = useState(false);

  const selectCategory = (category: ICategory) => {
    setJobdata({
      ...jobData,
      categoryId: category.id,
      categoryName: category.name,
    });
    setCategoryOpen(false);
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/category/`);

      if (response.data.STS === "200") {
        setCategories(
          response.data.CONTENT.map((category: ICategoryResponse) => {
            return {
              id: category.id,
              name: category.categoryName,
            };
          })
        );
      }
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const jobMutation = useMutation({
    mutationFn: postJob,
    onSuccess: (data) => {
      console.log(data);
      successToast("Job posted successfully!");
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

    const token = localStorage.getItem("sessionId");
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
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-white py-20">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleOnsubmitData} className="w-full">
          <div className="w-full px-8 py-10 space-y-6 bg-white rounded-lg shadow-xl border-l-8 border-blue-500">
            <h2 className="text-center font-bold text-3xl text-gray-800 mb-8">
              Create New Job Position
            </h2>

            <div className="flex flex-col gap-3">
              <label htmlFor="jobTitle" className="text-gray-700 font-medium">
                Job Title
              </label>
              <input
                id="jobTitle"
                name="jobTitle"
                value={jobData.jobTitle}
                onChange={handleChange}
                className="outline-none bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500 transition duration-200"
                type="text"
                placeholder="ex-Android Dev"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label
                htmlFor="jobDescription"
                className="text-gray-700 font-medium"
              >
                Job Description
              </label>
              <textarea
                id="jobDescription"
                rows={5}
                name="jobDescription"
                value={jobData.jobDescription}
                onChange={handleChange}
                className="outline-none px-4 py-3 bg-gray-50 rounded-lg text-gray-800 border border-gray-200 focus:ring-2 focus:ring-blue-500 transition duration-200"
                placeholder="Detail info about job title"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label htmlFor="jobAddress" className="text-gray-700 font-medium">
                Job Address
              </label>
              <input
                id="jobAddress"
                name="jobAddress"
                value={jobData.jobAddress}
                onChange={handleChange}
                className="outline-none px-4 py-3 bg-gray-50 rounded-lg text-gray-800 border border-gray-200 focus:ring-2 focus:ring-blue-500 transition duration-200"
                type="text"
                placeholder="Enter complete address"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label
                htmlFor="jobLocation"
                className="text-gray-700 font-medium"
              >
                Job Location
              </label>
              <input
                id="jobLocation"
                name="jobLocation"
                value={jobData.jobLocation}
                onChange={handleChange}
                className="outline-none px-4 py-3 bg-gray-50 rounded-lg text-gray-800 border border-gray-200 focus:ring-2 focus:ring-blue-500 transition duration-200"
                type="text"
                placeholder="City, State"
              />
            </div>

            <div className="flex flex-col gap-3 relative">
              <label htmlFor="salary" className="text-gray-700 font-medium">
                Annual Salary
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  ₹
                </span>
                <input
                  id="salary"
                  name="salary"
                  placeholder="Enter annual salary"
                  value={jobData.salary}
                  onChange={handleChange}
                  className="outline-none w-full px-4 pl-8 py-3 bg-gray-50 rounded-lg text-gray-800 border border-gray-200 focus:ring-2 focus:ring-blue-500 transition duration-200"
                  type="text"
                />
              </div>
            </div>

            <div className="relative">
              <label htmlFor="category" className="text-gray-700 font-medium">
                Category
              </label>
              <div
                className={`w-full mt-3 p-3 border "border-gray-200" rounded-lg bg-white flex justify-between items-center cursor-pointer`}
                onClick={() => setCategoryOpen(!categoryOpen)}
              >
                <span
                  className={
                    jobData.categoryId ? "text-gray-800" : "text-gray-400"
                  }
                >
                  {jobData.categoryName
                    ? categories?.find(
                        (cat) => cat.id === Number(jobData.categoryId)
                      )?.name ?? "Select Category"
                    : "Select Category"}
                </span>
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </div>

              {categoryOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                  {categories &&
                    categories.map((category, index) => (
                      <div
                        key={index}
                        className={`p-3 cursor-pointer hover:bg-gray-50 ${
                          index % 2 === 1 ? "bg-gray-50" : ""
                        }`}
                        onClick={() => selectCategory(category)}
                      >
                        {category.name}
                      </div>
                    ))}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <label htmlFor="jobType" className="text-gray-700 font-medium">
                Job Type
              </label>
              <select
                id="jobType"
                name="jobType"
                value={jobData.jobType}
                onChange={handleChange}
                className="w-full md:w-1/3 rounded-lg bg-gray-50 border border-gray-200 px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-500 transition duration-200"
              >
                <option value="" disabled>
                  Select Job Type
                </option>
                <option value="Remote">Remote</option>
                <option value="Onsite">On-Site</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            <div className="flex items-center justify-center pt-6">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-3 font-semibold rounded-lg hover:from-blue-700 hover:to-blue-900 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Publish Job
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Postjob;
