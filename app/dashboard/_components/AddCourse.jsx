"use client";

import { UserCourseListContext } from '@/app/_context/UserCourseListContext';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import React, { useContext } from 'react';

const AddCourse = () => {
    const { user } = useUser();
    const { userCourseList } = useContext(UserCourseListContext);

    return (
        <div className='flex flex-col items-start justify-between md:flex-row md:items-center'>
            <div className="mb-4 md:mb-0">
                <h2 className="text-2xl">
                    <span className='font-bold'>{user?.fullName}</span>
                </h2>
                <p className="text-sm text-gray-500">
                    Create a course with AI, share with friends and family
                </p>
            </div>
            <Link href={userCourseList >= 10 ? "/dashboard/upgrade" : "/create-course"}>
                <Button>+ Create AI Course</Button>
            </Link>
        </div>
    );
};

export default AddCourse;
