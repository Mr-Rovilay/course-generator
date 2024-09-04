import { RxClock } from "react-icons/rx";

const ChapterListCard = ({chapter, index}) => {
  return (
    <div className='grid items-center grid-cols-5 p-4 border-b'>
        <div className="">
            <h2 className='w-8 h-8 p-1 text-center text-white rounded-full bg-primary'>{index+1}</h2>
        </div>
        <div className="col-span-4">
            <h2 className="font-medium">{chapter.chapterName}</h2>
            <p className="flex items-center gap-2 text-sm text-primary"><RxClock />{chapter.duration}</p>
        </div>
    </div>
  )
}

export default ChapterListCard