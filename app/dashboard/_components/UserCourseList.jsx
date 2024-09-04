"use client";
import { UserCourseListContext } from "@/app/_context/UserCourseListContext";
import CourseCard from "@/app/create-course/[courseId]/_components/CourseCard";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/Schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import React, { useContext, useEffect, useState } from "react";

const UserCourseList = () => {
  const [courseList, setCourseList] = useState([]);
  const { userCourseList, setUserCourseList } = useContext(
    UserCourseListContext
  );
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
      setUserCourseList(result); // Update user's course list in context for other components to use
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    } finally {
      setLoading(false); // Stop loading once data is fetched
    }
  };

  if (courseList.length === 0) {
    return <div>No courses available.</div>; // Empty state UI
  }

  return (
    <div className="mt-10">
      <h2 className="text-lg font-bold">My AI Courses</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {courseList.length > 0
          ? courseList.map((course, i) => (
              <CourseCard
                course={course}
                key={i}
                refreshData={() => getUserCourses()}
              />
            ))
          : [1, 2, 3, 4, 5].map((item, index) => (
              <div
                key={index}
                className="w-full rounded-lg bg-slate-200 animate-pulse h-[270px] mt-5"
              ></div>
            ))}
      </div>
    </div>
  );
};

export default UserCourseList;
