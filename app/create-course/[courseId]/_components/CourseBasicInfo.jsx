import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { RiPuzzle2Fill } from "react-icons/ri";
import EditCourse from './EditCourse';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { storage } from '@/configs/fireBaseConfig';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/Schema';
import { eq } from 'drizzle-orm';

const CourseBasicInfo = ({ course, refreshData }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const onFileSelected = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(URL.createObjectURL(file)); // Preview the file

      const fileName = Date.now() + ".jpg";
      const storageRef = ref(storage, "ai-course/" + fileName);

      try {
        // Upload the file
        await uploadBytes(storageRef, file);
        
        // Get the download URL
        const downloadUrl = await getDownloadURL(storageRef);
        console.log("File available at:", downloadUrl);

       // Update the course banner in the database
       await db.update(CourseList).set({
        courseBanner: downloadUrl,
      }).where(eq(CourseList.id, course?.id));

      // Optionally update the UI with the new image URL
      setSelectedFile(downloadUrl);

      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  return (
    <div className='p-10 mt-5 border shadow-sm rounded-xl'>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="">
          <h2 className="text-3xl font-bold">
            {course?.courseOutput?.courseName}
            <EditCourse course={course} refreshData={() => refreshData(true)} />
          </h2>
          <p className="mt-3 text-sm text-gray-400">
            {course?.courseOutput?.description}
          </p>
          <h2 className="flex items-center gap-2 mt-2 font-medium text-primary">
            <RiPuzzle2Fill /> {course?.courseOutput?.category}
          </h2>
          <Button className="w-full mt-5">Start</Button>
        </div>
        <div className="">
          <label htmlFor='upload-image' className='cursor-pointer'>
            <Image
              src={selectedFile || "/creative.png"}
              alt="Course Image"
              width="200"
              height="100"
              className='w-full rounded-xl h-[300px] object-contain'
            />
          </label>
          <Input
            type="file"
            id="upload-image"
            className="opacity-0"
            onChange={onFileSelected}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseBasicInfo;
