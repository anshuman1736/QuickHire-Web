"use client"
import { useState } from 'react';

const Postjob = () => {
  const [jobData, setJobdata] = useState({
    jobTitle: "",
    jobDescription: "",
    jobAddress: "",
    jobLocation: "",
    salary: "",
    jobType: "",
    categoryId: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setJobdata((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleOnsubmitData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(jobData);
    // You can add API call logic here
  };

  return (
    <div className='h-full bg-white py-18 bg-gradient-to-r from-blue-200 to-white'>
      <form onSubmit={handleOnsubmitData} className='flex items-center flex-col justify-center'>
        <div className='px-5 w-2/3 p-5 space-y-4 rounded-tl-4xl rounded-sm border-2'>
          <h2 className='text-center font-bold text-2xl text-gray-700'>Create New Job</h2>

          <div className='flex flex-col gap-2'>
            <label htmlFor="jobTitle">Job Title</label>
            <input
              id='jobTitle'
              name='jobTitle'
              value={jobData.jobTitle}
              onChange={handleChange}
              className='outline-none px-3 py-1 rounded-sm text-sm border'
              type="text"
              placeholder='ex-Android Dev'
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor="jobDescription">Job Description</label>
            <textarea
              id='jobDescription'
              name='jobDescription'
              value={jobData.jobDescription}
              onChange={handleChange}
              className='outline-none px-3 py-1 rounded-sm text-sm border'
              placeholder='Detail info about job title'
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor="jobAddress">Job Address</label>
            <input
              id='jobAddress'
              name='jobAddress'
              value={jobData.jobAddress}
              onChange={handleChange}
              className='outline-none px-3 py-1 rounded-sm text-sm border'
              type="text"
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor="jobLocation">Job Location</label>
            <input
              id='jobLocation'
              name='jobLocation'
              value={jobData.jobLocation}
              onChange={handleChange}
              className='outline-none px-3 py-1 rounded-sm text-sm border'
              type="text"
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor="salary">Salary</label>
            <input
              id='salary'
              name='salary'
              value={jobData.salary}
              onChange={handleChange}
              className='outline-none px-3 py-1 rounded-sm text-sm border'
              type="text"
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor="jobType">Job Type</label>
            <select
              id="jobType"
              name="jobType"
              value={jobData.jobType}
              onChange={handleChange}
              className='w-[20%] border px-3 py-1'
            >
              <option value="" disabled>Select</option>
              <option value="Remote">Remote</option>
              <option value="Work from Home">Work-from Home</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <div className='flex items-center justify-center'>
            <button type="submit" className='bg-green-300 px-20 py-2 rounded-sm hover:bg-green-400 cursor-pointer'>
              Publish Job
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Postjob;
