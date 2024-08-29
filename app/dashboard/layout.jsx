import React, { Children } from 'react'
import SideBar from './_components/SideBar'

const DashboardLayout = ({children}) => {
  return (
    <div className="">

        <div className="hidden md:w-64 md:block">
            <SideBar/>
        </div>
        <div className='p-10 md:ml-64'>{children}</div>

    </div>
  )
}

export default DashboardLayout