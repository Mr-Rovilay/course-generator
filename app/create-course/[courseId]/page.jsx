"use client"

import { db } from "@/configs/db";
import { CourseList } from "@/configs/Schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { useEffect, useState } from "react";
import CourseBasicInfo from "./_components/CourseBasicInfo";
import CourseDetails from "./_components/CourseDetails";
import ChapterList from "./_components/ChapterList";

const CourseLayout = ({params}) => {
  const {user} = useUser()
  const [course, setCourse] = useState([])

  useEffect(() => {
  params && GetCourse()
  }, [params, user]);

  const GetCourse = async () => {
    const result = await db.select().from(CourseList)
      .where(and(
        eq(CourseList.courseId, params?.courseId),
        eq(CourseList.createdBy, user?.primaryEmailAddress?.emailAddress)
      ));
      console.log(result)
      setCourse(result[0])
    return result;
  }

  return (
    <div className="mt-10 px-7 md:px-20 lg:px-44">
      <h2 className="text-2xl font-bold text-center">Course Layout</h2>
      <CourseBasicInfo course={course} refreshData={()=>GetCourse}/>
      <CourseDetails course={course}/>
      <ChapterList course={course} refreshData={()=>GetCourse}/>
    </div>
  )
}

export default CourseLayout