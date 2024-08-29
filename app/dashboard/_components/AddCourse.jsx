"use client"
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

const AddCourse = () => {
    const {user} = useUser()
  return (
    <div className='flex items-center justify-between'>
        <div className="">

        <h2 className="text-2xl"> <span className='font-bold'>{user?.fullName}</span></h2>
        <p className="text-sm text-gray-500">create a course with AI, Shear with friends and family</p>
        </div>
        <Link href={"/create-course"}>
        <Button>+ Create AI Course</Button>
        </Link>
    </div>
  )
}

export default AddCourse