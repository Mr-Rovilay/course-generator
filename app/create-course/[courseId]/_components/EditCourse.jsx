"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
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
import { DialogClose } from "@radix-ui/react-dialog";
import { eq } from "drizzle-orm";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";

const EditCourse = ({ course, refreshData }) => {
  // Ensure courseOutput is defined before accessing its properties
  const [name, setName] = useState(course?.courseOutput?.courseName || "");
  const [description, setDescription] = useState(course?.courseOutput?.description || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (course && course.courseOutput) {
      setName(course?.courseOutput?.courseName || "");
      setDescription(course?.courseOutput?.description || "");
    }
  }, [course]);

  const onUpdateHandler = async () => {
    if (!course || !course.courseOutput) {
      setError("Course data is missing. Please try again.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
       // Create the updated course output
      const updatedCourseOutput = {
        ...course.courseOutput,
        courseName: name,
        description: description,
      };

          // Perform the database update

      const result = await db
        .update(CourseList)
        .set({ courseOutput: updatedCourseOutput })
        .where(eq(CourseList.id, course.id))
        .returning({ id: CourseList.id });
        
refreshData(true)
   

    } catch (err) {
      console.error("Error updating course:", err);
      setError("Failed to update course. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <CiEdit className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Course Title & Description</DialogTitle>
          <DialogDescription>
            {course && course.courseOutput ? (
              <>
                <div className="mt-3">
                  <label htmlFor="course-title">Course Title</label>
                  <Input
                    id="course-title"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="focus-visible:ring-0"
                  />
                </div>
                <div className="mt-4">
                  <label htmlFor="course-description">Description</label>
                  <Textarea
                    id="course-description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="h-40 focus-visible:ring-0"
                  />
                </div>
              </>
            ) : (
              <p>Course data is not available.</p>
            )}
            {error && <p className="mt-4 text-red-500">{error}</p>}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={onUpdateHandler} disabled={loading || !course || !course.courseOutput}>
              {loading ? "Updating..." : "Update"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditCourse;
