import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div className='flex items-center justify-between p-5 shadow-sm'>
      <Link href={"/"}>
        <Image src={"/logo.svg"} width={90} height={90} alt=''/>
      </Link>
        <UserButton/>
    </div>
  )
}

export default Header