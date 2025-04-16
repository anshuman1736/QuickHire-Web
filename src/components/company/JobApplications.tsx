"use client";
// import { getEnableJob } from "@/lib/queries";
// import { JobPostingContent } from "@/types/job";
// import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const JobHstry = () => {
  // const { isPending, isError, data, error } = useQuery({
  //   queryKey: ["todos"],
  //   queryFn: getEnableJob
  // });

  // if (isPending) {
  //   return <span>Loading...</span>
  // }

  // if (isError) {
  //   return <span>Error: {error.message}</span>
  // }

  const jobPosts = [
    {
      title: "Web Developer",
      company: "Kika Office Pune",
      skills: "Java, Good Communication, HTML, CSS, JS",
      location: "Kharadi IT Park",
      experience: "2-4 years",
      salary: "₹ 8.50 - 11 Lacs LPA",
      applications: 315,
      vacancies: 4,
      postedAgo: "3 days ago",
      postedBy: "HR Ashoka",
    },
    {
      title: "Frontend Engineer",
      company: "PixelSoft Mumbai",
      skills: "React, TypeScript, TailwindCSS",
      location: "Andheri East",
      experience: "1-3 years",
      salary: "₹ 6.00 - 9 Lacs LPA",
      applications: 120,
      vacancies: 2,
      postedAgo: "2 days ago",
      postedBy: "HR Kavya",
    },
    {
      title: "Backend Developer",
      company: "CodeWave Bangalore",
      skills: "Node.js, Express, MongoDB",
      location: "Koramangala",
      experience: "3-5 years",
      salary: "₹ 10 - 14 Lacs LPA",
      applications: 210,
      vacancies: 3,
      postedAgo: "1 day ago",
      postedBy: "HR Vinay",
    },
    {
      title: "Full Stack Developer",
      company: "Techverse Hyderabad",
      skills: "MERN Stack, API Design",
      location: "HITEC City",
      experience: "2-4 years",
      salary: "₹ 9 - 12 Lacs LPA",
      applications: 400,
      vacancies: 5,
      postedAgo: "5 days ago",
      postedBy: "HR Sneha",
    },
    {
      title: "UI/UX Designer",
      company: "DesignPro Chennai",
      skills: "Figma, Adobe XD, UI Principles",
      location: "OMR Road",
      experience: "1-3 years",
      salary: "₹ 5 - 8 Lacs LPA",
      applications: 80,
      vacancies: 1,
      postedAgo: "6 days ago",
      postedBy: "HR Mohit",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-white py-20 mt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Job History Dashboard
        </h1>

        <div className="space-y-6">
          {jobPosts.map((job, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-lg border-l-4 border-blue-500 hover:shadow-xl transition duration-300"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-4 flex-1">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">
                        {job.title}
                      </h2>
                      <h3 className="text-lg text-gray-600">{job.company}</h3>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {job.skills.split(", ").map((skill, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-5 h-5 text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span className="text-gray-600">{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-5 h-5 text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-gray-600">{job.experience}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-5 h-5 text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-gray-600">{job.salary}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-5 h-5 text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-gray-600">{job.postedAgo}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-4">
                    <div className="bg-green-100 px-4 py-2 rounded-lg">
                      <span className="text-green-800 font-semibold">
                        {job.applications} Applications
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="bg-red-100 text-red-800 px-3 py-1 rounded-lg text-sm font-medium">
                        {job.vacancies} vacancies
                      </span>
                      <span className="text-gray-500 text-sm">
                        Posted by {job.postedBy}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-4">
                  <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition duration-200 shadow-md">
                    Update Post
                  </button>
                  <Link
                    href="/company/job-application/candiates"
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition duration-200 shadow-md"
                  >
                    View Candidates
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobHstry;
