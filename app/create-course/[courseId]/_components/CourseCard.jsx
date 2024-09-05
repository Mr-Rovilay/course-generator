
"use client"
import Image from "next/image";
import React from "react";
import { GrChapterAdd } from "react-icons/gr";
import { LiaLevelUpAltSolid } from "react-icons/lia";
import { HiOutlineEllipsisVertical } from "react-icons/hi2";
import DropdownOpt from "./DropdownOpt";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/Schema";
import { eq } from "drizzle-orm";
import Link from "next/link";

const CourseCard = ({ course, refreshData, displayUser=false }) => {
  const handleOnDelete = async () => {
    const res = await db
      .delete(CourseList)
      .where(eq(CourseList.id, course?.id))
      .returning({ id: CourseList?.id });
    if (res) {
      refreshData(true);
    }
  };
  return (
    <div className="flex flex-col gap-1 p-2 mt-4 border rounded-lg shadow-md cursor-pointer">
      <Link href={"/course/"+course?.courseId}>
      <Image
        src={course?.courseBanner}
        width={300}
        height={300}
        className="w-full h-[200px] object-cover rounded-lg"
      />
       </Link>
      <div className="p-2">
        <h2 className="flex items-center justify-between text-lg font-medium">
          {course?.courseOutput?.courseName}

          {!displayUser && <DropdownOpt handleOnDelete={() => handleOnDelete()}>
            <HiOutlineEllipsisVertical />
          </DropdownOpt>}
        </h2>
        <p className="my-1 text-sm text-gray-400">{course?.category}</p>
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 p-1 text-sm rounded-sm bg-purple-50 text-primary">
            <GrChapterAdd />
            {course?.courseOutput?.noOfChapters} Chapters
          </h2>
          <h2 className="flex items-center gap-2 p-1 text-sm rounded-sm bg-purple-50 text-primary">
            <LiaLevelUpAltSolid />
            {course?.level}
          </h2>
        </div>
       {displayUser &&  <div className="flex items-center gap-3 mt-2">
          <Image src={course?.userProfileImage} width={35} height={35} className="rounded-full"/>
          <h2 className="text-sm">{course?.userName}</h2>
        </div>}
      </div> 
    </div>
  );
};

export default CourseCard;
