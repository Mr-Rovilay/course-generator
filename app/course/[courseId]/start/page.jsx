"use client";
import { db } from "@/configs/db";
import { eq, and } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import ChapterListCard from "./_component/ChapterListCard";
import ChapterContent from "./_component/ChapterContent";
import { Chapters, CourseList } from "@/configs/Schema";

const Start = ({ params }) => {
  const [course, setCourse] = useState();
  const [selectedChapter, setSelectedChapter] = useState();
  const [chapterContent, setChapterContent] = useState();

  useEffect(() => {
    GetCourse();
   
  }, []);

  const GetCourse = async () => {
    try {
      const result = await db
        .select()
        .from(CourseList)
        .where(eq(CourseList.courseId, params?.courseId));
      setCourse(result[0]);
      GetSelectedChapterContent(0)
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  };

  const GetSelectedChapterContent = async (chapterId) => {
    if (!course?.courseId) {
      console.warn("Course ID is not defined yet.");
      return;
    }
  
    try {
      const result = await db
        .select()
        .from(Chapters)
        .where(
          and(
            eq(Chapters.chapterId, chapterId),
            eq(Chapters.courseId, course?.courseId)
          )
        );
      setChapterContent(result[0]);
    } catch (error) {
      console.error("Error fetching chapter content:", error);
    }
  };
  
  

  return (
    <div>
      <div className="fixed h-screen border-r shadow-sm md:w-72 md:block sm:bg-white">
        <h2 className="p-4 text-lg font-medium text-white bg-primary">
          {course?.courseOutput?.courseName}
        </h2>
        <div className="">
          {course?.courseOutput?.chapters.map((chapter, index) => (
            <div
              className={`cursor-pointer hover:bg-purple-50 ${
                selectedChapter?.chapterName === chapter?.chapterName &&
                "bg-purple-100"
              }`}
              key={index}
              onClick={() => {setSelectedChapter(chapter);GetSelectedChapterContent(index)}}
            >
              <ChapterListCard chapter={chapter} index={index} />
            </div>
          ))}
        </div>
      </div>
      <div className="md:ml-64">
        <ChapterContent chapter={selectedChapter} content={chapterContent}/>
      </div>
    </div>
  );
};

export default Start;
