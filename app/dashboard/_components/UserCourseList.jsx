"use client";
import CourseCard from "@/app/create-course/[courseId]/_components/CourseCard";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/Schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";

const UserCourseList = () => {
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      getUserCourses();
    }
  }, [user]);

  const getUserCourses = async () => {
    try {
      const result = await db
        .select()
        .from(CourseList)
        .where(
          eq(CourseList.createdBy, user.primaryEmailAddress?.emailAddress)
        );
      setCourseList(result);
      console.log(result);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    } finally {
      setLoading(false); // Stop loading once data is fetched
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Loading state UI
  }

  if (courseList.length === 0) {
    return <div>No courses found.</div>; // Empty state UI
  }

  return (
    <div className="mt-10">
      <h2 className="text-lg font-bold">My AI Courses</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {courseList.map((course, i) => (
          <CourseCard
            course={course}
            key={i}
            refreshData={() => getUserCourses()}
          />
        ))}
      </div>
    </div>
  );
};

export default UserCourseList;
