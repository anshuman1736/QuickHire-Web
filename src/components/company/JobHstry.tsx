import { Route } from 'lucide-react';
import Link from 'next/link';

import React from 'react'

const JobHstry = () => {
//   dummy data
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
          postedBy: "HR Ashoka"
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
          postedBy: "HR Kavya"
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
          postedBy: "HR Vinay"
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
          postedBy: "HR Sneha"
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
          postedBy: "HR Mohit"
        }
      ];
      
  return (
    <div className='p-20 bg-white'>
        <h1 className='text-xl font-medium text-gray-600'>job history of our company.</h1>


        <div className='px-20 mt-5 space-y-4'>
        {
            jobPosts.map((job,idx)=>(
                <div key={idx} className='bg-blue-100 p-5 space-y-2 flex flex-row justify-between items-center rounded-lg'>
                <div className='space-y-1'>
                    <div>
                    <h2 className='text-xl font-semibold '>{job.title}</h2>
                    <h3 className='text-lg text-gray-600 font-light'>{job.company}</h3>
                    <p className='text-gray-500 text-sm font-light'>{job.skills}</p>
                    </div>
                    {/* <div className='w-10 h-10 rounded-2xl bg-red-500'></div> */}
                   
                    <p className='text-gray-600 text-sm font-light mt-2'>{job.location}</p>
                    <p className='text-gray-500 text-sm font-light'>{job.experience}</p>
                    <p className='text-gray-600 text-sm font-light'>{job.postedAgo}</p>
                    <p className='text-gray-600 text-sm font-light'>₹ {job.salary}</p>   
                </div>
                <div className=' items-center justify-center flex flex-col gap-6'>
                    <h3 className='px-4 py-2 rounded text-gray-700 bg-green-300 text-lg font-medium w-fit'>{job.applications} Applications Recieved</h3>
                   <div className='flex gap-2 items-center '>
                   <span className='text-xs px-6 py-1 font-semibold bg-amber-100 text-red-500'>{job.vacancies} vacancies</span>
                   <p className='text-gray-600 text-xs font-light'> 3 days ago    {job.postedBy}</p>
                   </div>
                </div>
                {/* buttons */}
                <div className='space-x-7'>
                    <button className='px-8 py-2 rounded-md cursor-pointer hover:bg-blue-500 text-white font-semibold bg-blue-400 text-lg '>Update post</button>
                    <Link
                      href="/company/jobhstry/candiates"
                      className="px-8 py-2 rounded-md cursor-pointer hover:bg-blue-500 text-white font-semibold bg-blue-400 text-lg"
                    >
                      Candidates
                    </Link>
                </div>
            </div>
            ))
        }
       
        </div>
    </div>
  )
}

export default JobHstry