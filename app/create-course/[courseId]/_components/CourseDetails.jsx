import { HiOutlineChartBar } from "react-icons/hi";
import { LuClock7 } from "react-icons/lu";
import { FaBook } from "react-icons/fa6";
import { FaRegCirclePlay } from "react-icons/fa6";

const CourseDetails = ({ course }) => {
  return (
    <div className="p-6 mt-3 border shadow-sm rounded-xl">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex items-center gap-3">
          <HiOutlineChartBar className="text-2xl md:text-3xl text-primary" />
          <div>
            <h2 className="text-xs text-gray-500 md:text-sm">Skill Level</h2>
            <h2 className="text-sm font-medium md:text-lg">{course?.courseOutput?.level}</h2>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <LuClock7 className="text-2xl md:text-3xl text-primary" />
          <div>
            <h2 className="text-xs text-gray-500 md:text-sm">Duration</h2>
            <h2 className="text-sm font-medium md:text-lg">{course?.courseOutput?.duration}</h2>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <FaBook className="text-2xl md:text-3xl text-primary" />
          <div>
            <h2 className="text-xs text-gray-500 md:text-sm">No of Chapters</h2>
            <h2 className="text-sm font-medium md:text-lg">{course?.courseOutput?.noOfChapters}</h2>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <FaRegCirclePlay className="text-2xl md:text-3xl text-primary" />
          <div>
            <h2 className="text-xs text-gray-500 md:text-sm">Video Included?</h2>
            <h2 className="text-sm font-medium md:text-lg">{course?.includeVideo ? "Yes" : "No"}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
