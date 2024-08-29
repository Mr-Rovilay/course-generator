import React, { Children } from 'react'
import SideBar from './_components/SideBar'
import Header from './_components/Header'

const DashboardLayout = ({children}) => {
  return (
    <div className="">

        <div className="hidden md:w-64 md:block">
            <SideBar/>
        </div>
        <div className='md:ml-64'>
          <Header/>
          <div className="p-10">

          {children}
            
          </div>
          </div>

    </div>
  )
}

export default DashboardLayout