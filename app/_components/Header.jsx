import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <div className='flex justify-between p-5 shadow-sm'>
      <h2 className="text-xl">AI<span className='text-sm text-primary'>Generator</span></h2>
   
    </div>
  )
}

export default Header