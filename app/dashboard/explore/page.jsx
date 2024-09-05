"use client";
import CourseCard from '@/app/create-course/[courseId]/_components/CourseCard';
import { Button } from '@/components/ui/button';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/Schema';
import React, { useEffect, useState } from 'react';

const Explore = () => {
  const [courseList, setCourseList] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 9;

  useEffect(() => {
    GetAllCourses();
  }, [pageIndex]);

  const GetAllCourses = async () => {
    try {
      const result = await db
        .select()
        .from(CourseList)
        .limit(pageSize)
        .offset(pageIndex * pageSize);
      setCourseList(result);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handlePreviousPage = () => {
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1);
    }
  };

  const handleNextPage = () => {
    if (courseList.length === pageSize) {
      setPageIndex(pageIndex + 1);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold">Explore More Courses</h2>
      <p>Explore more projects built with AI by other users</p>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {courseList.map((course, i) => (
          <div key={course.courseId}>
            <CourseCard course={course} displayUser={true} />
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-5">
        <Button onClick={handlePreviousPage} disabled={pageIndex === 0}>
          Previous Page
        </Button>
        <Button onClick={handleNextPage} disabled={courseList.length < pageSize}>
          Next Page
        </Button>
      </div>
    </div>
  );
};

export default Explore;
