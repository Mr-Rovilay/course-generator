"use client";

import { db } from "@/configs/db";
import { Chapters, CourseList } from "@/configs/Schema";
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
import { useRouter } from "next/navigation";

const CourseLayout = ({ params }) => {
  const { user } = useUser();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Corrected instantiation

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

    try {
      const chapters = course?.courseOutput?.chapters;

      for (const [index, chapter] of chapters.entries()) {
        const PROMPT = `Explain the concept in Details on Topic: ${course?.name}, Chapter: ${chapter.chapterName}, in JSON Format with list of array with fields as title, explanation on give chapter in detail, Code Example (Code field in <precode> format) if applicable`;
        console.log(PROMPT)

        // AI Content Generation
        const aiResult = await GenerateCourseLayout_AI.sendMessage(PROMPT);
        const content = JSON.parse(aiResult?.response?.text());
        console.log("AI Generated Content:", content);

        // Fetch Related Videos
        let videoId = "";
        try {
          const videoResult = await Service.getVideos(
            `${course?.name}:${chapter.chapterName}`
          );
          console.log("Video Result:", videoResult);
          videoId = videoResult[0]?.id?.videoId || "";
        } catch (videoError) {
          console.error("Error fetching videos:", videoError);
        }

        // Save Chapter Content and Video ID
        await db.insert(Chapters).values({
          chapterId: index,
          courseId: course?.courseId,
          content: content,
          videoId: videoId,
        });
      }
      await db.update(CourseList).set({
        publish: true,
      });

      // Navigate to the finish page after all chapters are processed
      router.replace(`/create-course/${course?.courseId}/finish`);
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
