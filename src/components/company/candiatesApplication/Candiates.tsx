import React from 'react'
import { Briefcase } from 'lucide-react';
import Image from 'next/image';
import girl1 from '@/assets/images/girl1.jpg';
import girl2 from '@/assets/images/girl2.jpg';
import girl3 from '@/assets/images/girl3.jpg';
import girl4 from '@/assets/images/girl4.jpg';
import man1 from '@/assets/images/man1.jpg';
const Candiates = () => {
   
    const candidates = [
        {
          name: "Daniel Joe",
          role: "Web Developer",
          experience: "3 yrs",
          timeAgo: "2h ago",
          postedBy: "Daniel Joe",
          image: girl1, // Add image import or URL here
        },
        {
          name: "Sophia Lane",
          role: "UI/UX Designer",
          experience: "2 yrs",
          timeAgo: "5h ago",
          postedBy: "Sophia Lane",
          image: girl2,
        },
        {
          name: "Ethan Wright",
          role: "Frontend Engineer",
          experience: "4 yrs",
          timeAgo: "1d ago",
          postedBy: "Ethan Wright",
          image: girl3,
        },
        {
          name: "Ava Patel",
          role: "Backend Developer",
          experience: "5 yrs",
          timeAgo: "3d ago",
          postedBy: "Ava Patel",
          image: girl4,
        },
        {
          name: "Liam Chen",
          role: "Full Stack Developer",
          experience: "6 yrs",
          timeAgo: "1h ago",
          postedBy: "Liam Chen",
          image: man1,
        },
        {
          name: "Mia Gomez",
          role: "Project Manager",
          experience: "7 yrs",
          timeAgo: "4h ago",
          postedBy: "Mia Gomez",
          image: girl1,
        },
        {
          name: "Noah Smith",
          role: "DevOps Engineer",
          experience: "4 yrs",
          timeAgo: "2d ago",
          postedBy: "Noah Smith",
          image: man1,
        },
        {
          name: "Emma Johnson",
          role: "QA Tester",
          experience: "3 yrs",
          timeAgo: "6h ago",
          postedBy: "Emma Johnson",
          image: girl3,
        },
        {
          name: "James Brown",
          role: "Mobile App Developer",
          experience: "5 yrs",
          timeAgo: "5d ago",
          postedBy: "James Brown",
          image: girl3,
        },
        {
          name: "Olivia Lee",
          role: "Software Engineer",
          experience: "2 yrs",
          timeAgo: "3h ago",
          postedBy: "Olivia Lee",
          image: man1,
        },
      ];
      
  return (
    <div className='p-20 bg-white space-y-5'>
        <h1 className='text-3xl font-semibold text-gray-500'>Applications for web Devlopment</h1>
        
        <div className='grid grid-cols-1 md:grid-cols-3 gap-2 '>
        {
            candidates.map((can,idx)=>(
             <div key={idx} className='bg-blue-200  p-4  rounded-2xl'>
            <div className='flex gap-5 items-center'>
                <div ><Image className='object-cover h-25 w-25 rounded-full ' alt='profile pic' src={can.image} /></div>
            <div className='space-y-1'>
            <h2 className='text-2xl font-semibold text-gray-700 '>{can.name}</h2>
                <p className='text-lg text-gray-700 font-light '>{can.role}</p>
                <p className='text-sm font-light flex items-center gap-2'> <Briefcase  className='text-gray-600'/> {can.experience} experience</p>
            </div>

            </div>
            <div className='flex items-center justify-between'>
                <p className='text-gray-700 text-xs '>{can.timeAgo}   posted by {can.postedBy}</p>
                <button className='px-8 py-2 rounded-md cursor-pointer hover:bg-blue-500 text-white font-semibold bg-blue-400 text-lg '>View Applicaion</button>
            </div>
        </div>
            ))
        }
        </div>
       
    </div>
  )
}

export default Candiates