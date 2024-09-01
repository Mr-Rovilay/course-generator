"use client";

import { db } from "@/configs/db";
import { CourseList } from "@/configs/Schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { useEffect, useState } from "react";
import CourseBasicInfo from "./_components/CourseBasicInfo";
import CourseDetails from "./_components/CourseDetails";
import ChapterList from "./_components/ChapterList";
import { Button } from "@/components/ui/button";
import { GenerateCourseLayout_AI } from "@/configs/AiModel";
import Loading from "../_components/Loading";
import Service from "@/configs/Service";

const CourseLayout = ({ params }) => {
  const { user } = useUser();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const generateChapterContent = async () => {
    setLoading(true);
    const chapters = course?.courseOutput?.chapters;

    try {
      for (const chapter of chapters) {
        const PROMPT = `Explain the concept in Details on Topic: ${course?.courseName}, Chapter: ${chapter.chapterName}, in JSON Format with list of array with fields as title, description in detail, code example (Code field in <precode> format) if applicable`;

        // AI Content Generation
        // const aiResult = await GenerateCourseLayout_AI.sendMessage(PROMPT);
        // console.log(aiResult?.response?.text());

        // Fetch Related Videos
        try {
          const videoResult = await Service.getVideos(`${course?.courseName}:${chapter.chapterName}`);
          console.log(videoResult);
          // You can save video URLs or do other operations here
        } catch (videoError) {
          console.error("Error fetching videos:", videoError);
        }
      }
    } catch (error) {
      console.error("Error generating chapter content:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 px-7 md:px-20 lg:px-44">
      <h2 className="text-2xl font-bold text-center">Course Layout</h2>
      <Loading loading={loading} />
      <CourseBasicInfo course={course} refreshData={GetCourse} />
      <CourseDetails course={course} />
      <ChapterList course={course} refreshData={GetCourse} />
      <Button onClick={generateChapterContent} className="mt-10">
        Generate Course
      </Button>
    </div>
  );
};

export default CourseLayout;
