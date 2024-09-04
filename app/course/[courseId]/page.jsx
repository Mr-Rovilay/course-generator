"use client";
import Header from "@/app/_components/Header";
import ChapterList from "@/app/create-course/[courseId]/_components/ChapterList";
import CourseBasicInfo from "@/app/create-course/[courseId]/_components/CourseBasicInfo";
import CourseDetails from "@/app/create-course/[courseId]/_components/CourseDetails";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/Schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";

const Course = ({ params }) => {
  const [course, setCourse] = useState();
  useEffect(() => {
    params && GetCourse();
  }, [params]);
  const GetCourse = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .where(eq(CourseList?.courseId,params?.courseId ));
    setCourse(result[0]);
  };
  return (
    <div>
      <Header/>
      <div className="px-2 md:px-20 lg:px-44">

      <CourseBasicInfo course={course} edit={false}/>
      <CourseDetails course={course}/>
      <ChapterList course={course} edit={false}/>
      </div>
    </div>
  );
};

export default Course;
