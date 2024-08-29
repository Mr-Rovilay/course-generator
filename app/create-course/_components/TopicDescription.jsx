import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

const TopicDescription = () => {
  return (
    <div className='mx-20 lg:mx-44'>
      {/* Topic */}
      <div className="mt-5">
        <label htmlFor="" className=''>Write the topic for which you want to generate a course (e.g, Phyton Course, Java, Nextjs etc.)</label>
        <Input placeholder={"Topic"}/>
      </div>
      <div className="mt-5">
        <label htmlFor="">Tell us more about your course, what you want to include in the (Optional) </label>
        <Textarea placeholder="About your course"/>
      </div>

    </div>
  )
}

export default TopicDescription