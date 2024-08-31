import { HiOutlineChartBar } from "react-icons/hi";
import { LuClock7 } from "react-icons/lu";
import { FaBook } from "react-icons/fa6";
import { FaRegCirclePlay } from "react-icons/fa6";

const CourseDetails = ({ course }) => {
  return (
    <div className="p-6 mt-3 border shadow-sm rounded-xl">
      <div className="grid grid-cols-2 md:grid-cols-4">
        <div className="flex items-center gap-2">
          <HiOutlineChartBar className="text-3xl text-primary" />
          <div className="">
            <h2 className="text-sm text-gray-500">Skill Level</h2>
            <h2 className="text-lg font-medium">{course?.courseOutput?.level}</h2>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <LuClock7 className="text-3xl text-primary" />
          <div className="">
            <h2 className="text-sm text-gray-500">Duration</h2>
            <h2 className="text-lg font-medium">{course?.courseOutput?.duration}</h2>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <FaBook className="text-3xl text-primary" />
          <div className="">
            <h2 className="text-sm text-gray-500">No of Chapters</h2>
            <h2 className="text-lg font-medium">{course?.courseOutput?.noOfChapters}</h2>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <FaRegCirclePlay className="text-3xl text-primary" />
          <div className="">
            <h2 className="text-sm text-gray-500">Video Included?</h2>
            <h2 className="text-lg font-medium">{course?.includeVideo}</h2>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default CourseDetails;
