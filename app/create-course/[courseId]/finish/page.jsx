"use client";

import { db } from '@/configs/db';
import { CourseList } from '@/configs/Schema';
import { useUser } from '@clerk/nextjs';
import { and, eq } from 'drizzle-orm';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import CourseBasicInfo from '../_components/CourseBasicInfo';
import { BsCopy } from "react-icons/bs";

const FinishScreen = ({ params }) => {
  const { user } = useUser();
  const [course, setCourse] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  
  const router = useRouter();

  useEffect(() => {
    if (params && user) {
      GetCourse();
    }
  }, [params, user]);

  const GetCourse = async () => {
    try {
      const result = await db
        .select()
        .from(CourseList)
        .where(
          and(
            eq(CourseList.courseId, params?.courseId),
            eq(CourseList.createdBy, user?.primaryEmailAddress?.emailAddress)
          )
        );

      console.log(result);
      setCourse(result[0]);
    } catch (error) {
      console.error("Error fetching course data:", error);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_HOST_NAME}/course/view/${course?.courseId}`);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Reset the copied state after 2 seconds
  };

  return (
    <div className='px-10 md:px-20 lg:px-44 my-7'>
      <h2 className="my-3 text-2xl font-bold text-center text-primary">Congrats!!!!! Your Course is Ready!!</h2>
      <CourseBasicInfo course={course} refreshData={() => console.log('Data refreshed')} />
      <div className="relative">
        <h2
          className="flex items-center justify-center gap-2 p-2 text-center text-gray-500 border rounded"
         
        >
          <BsCopy className='cursor-pointer'  onClick={handleCopy}
          onMouseEnter={() => setIsCopied(false)}/> {isCopied ? "Copied!" : `${process.env.NEXT_PUBLIC_HOST_NAME}/course/view/${course?.courseId}`}
        </h2>
        <span className="absolute px-3 py-1 mt-2 text-sm text-white transition-opacity duration-300 transform -translate-x-1/2 bg-gray-700 rounded opacity-0 left-1/2 tooltip">
          Click to copy to clipboard
        </span>
      </div>
    </div>
  );
};

export default FinishScreen;
