import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div className='flex items-center justify-between p-5 shadow-sm'>
      <Link href={"/"}>
      <h2 className="text-xl">AI<span className='text-sm text-primary'>Generator</span></h2>
      </Link>
        <UserButton/>
    </div>
  )
}

export default Header