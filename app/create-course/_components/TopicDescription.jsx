import { UserInputContext } from '@/app/_context/UserInputContext'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React, { useContext } from 'react'

const TopicDescription = () => {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
  const handleInputChange =(fieldName, value) => {
    setUserCourseInput((prev) => ({
     ...prev,
      [fieldName]: value,
    }));
  }
  return (
    <div className='mx-20 lg:mx-44'>
      {/* Topic */}
      <div className="mt-5">
        <label htmlFor="" className=''>Write the topic for which you want to generate a course (e.g, Phyton Course, Java, Nextjs etc.)</label>
        <Input placeholder={"Topic"} defaultValue={userCourseInput?.topic} className="text-xl h-14" onChange={(e)=> handleInputChange("topic",e.target.value)}/>
      </div>
      <div className="mt-5">
        <label htmlFor="">Tell us more about your course, what you want to include in the (Optional) </label>
        <Textarea placeholder="About your course" className="h-24 text-xl" onChange={(e)=> handleInputChange("description",e.target.value)} defaultValue={userCourseInput?.description}/>
      </div>

    </div>
  )
}

export default TopicDescription