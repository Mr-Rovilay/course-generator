"use client"
import Image from 'next/image'
import { LuHome } from "react-icons/lu";
import { CiLogout } from "react-icons/ci";
import { GiSpikyExplosion } from "react-icons/gi";
import { GiUpgrade } from "react-icons/gi";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';
import { useContext } from 'react';
import { UserCourseListContext } from '@/app/_context/UserCourseListContext';

const SideBar = () => {
    const {userCourseList, setUserCourseList}= useContext(UserCourseListContext)
    const Menu = [
        {
            id: 1,
            name: "Home",
            icon: <LuHome />,
            path: "/dashboard"
        },
        {
            id: 2,
            name: "Explore",
            icon: <GiSpikyExplosion />,
            path: "/dashboard/explore"
        },
    ];

    const path = usePathname();

    return (
        <div className='fixed h-full p-5 shadow-md md:w-64'>
            <h2 className="text-2xl">AI<span className='text-sm text-primary'>Generator</span></h2>
            <hr className='my-5' />

            <ul>
                {Menu.map((item) => (
                    <li key={item.id} className={`flex items-center gap-2 p-3 text-gray-600 rounded-lg cursor-pointer hover:bg-gray-100 hover:text-black mb-3
                    ${item.path === path && "bg-gray-100 text-black"}`}>
                        <Link href={item.path} className="flex items-center w-full gap-2">
                            <div className="text-2xl">{item.icon}</div>
                            <h2>{item.name}</h2>
                        </Link>
                    </li>
                ))}
            </ul>
            <div className="absolute bottom-10 w-[80%]">
                <Progress value={(userCourseList?.length/10)*100} />
                <h2 className="my-2 text-sm">{userCourseList?.length} Out of 10 Course created</h2>
                <h2 className='text-xs text-gray-500'>Upgrade your plan for unlimited course to get value to your course</h2>
            </div>
        </div>
    )
}

export default SideBar;
