import { LuClock7 } from "react-icons/lu";
import { CiCircleCheck } from "react-icons/ci";
import EditChapters from "./EditChapters";

const ChapterList = ({ course, refreshData, edit=true }) => {
  return (
    <div className='mt-3'>
      <h2 className="text-xl font-medium">Chapters</h2>
      <div className="mt-2">
        {course?.courseOutput?.chapters?.map((chapter, index) => (
          <div 
            key={index} // Add a unique key for each item
            className="flex items-center justify-between p-5 mb-2 border rounded-lg"
          >
            <div className="flex items-center gap-5">
              <h2 className="flex-none w-10 h-10 p-2 text-center text-white rounded-full bg-primary">
                {index + 1}
              </h2>
              <div>
                <h2 className="text-lg font-medium">
                  {chapter.chapterName}
                 {edit && <EditChapters 
                    course={course} 
                    index={index} 
                    refreshData={refreshData}
                  />}
                </h2>
                <p className="text-sm text-gray-500">{chapter.about}</p>
                <p className="flex items-center gap-2 text-primary">
                  <LuClock7 />{chapter.duration}
                </p>
              </div>
            </div>
            <CiCircleCheck className="flex-none text-4xl text-gray-300"/>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChapterList;
