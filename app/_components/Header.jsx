import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <div className='flex justify-between p-5 shadow-sm'>
        <Image src={"/logo.svg"} width={100} height={100} alt='logo'/>
    </div>
  )
}

export default Header