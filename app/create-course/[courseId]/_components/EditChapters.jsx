"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/Schema";
import { eq } from "drizzle-orm";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";

const EditChapters = ({ index, course, refreshData }) => {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  useEffect(() => {
    if (course && course.courseOutput && course.courseOutput.chapters) {
      const chapter = course.courseOutput.chapters[index];
      if (chapter) {
        setName(chapter.chapterName || "");
        setAbout(chapter.about || "");
      }
    }
  }, [course, index]);

  const onUpdateHandler = async () => {
    if (course && course.courseOutput && course.courseOutput.chapters) {
      const updatedChapters = [...course.courseOutput.chapters];
      updatedChapters[index] = {
        ...updatedChapters[index],
        chapterName: name,
        about: about,
      };

      const result = await db
        .update(CourseList)
        .set({ courseOutput: { ...course.courseOutput, chapters: updatedChapters } })
        .where(eq(CourseList.id, course.id))
        .returning({ id: CourseList.id });
        refreshData(true)

    } else {
      console.error("Course or chapters data is missing");
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <CiEdit className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Chapter</DialogTitle>
          <DialogDescription>
            <div className="mt-3">
              <label htmlFor="chapter-name">Chapter Name</label>
              <Input
                id="chapter-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="focus-visible:ring-0"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="chapter-about">Description</label>
              <Textarea
                id="chapter-about"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="h-40 focus-visible:ring-0"
              />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={onUpdateHandler}>Update</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditChapters;
