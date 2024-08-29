import Image from 'next/image'
import { LuHome } from "react-icons/lu";
import { CiLogout } from "react-icons/ci";
import { GiSpikyExplosion } from "react-icons/gi";
import { GiUpgrade } from "react-icons/gi";

const SideBar = () => {
    const Menu = [
        {
            id:1,
            name: "Home",
            icon:<LuHome />,
            path: "/dashboard"
        },
        {
            id:2,
            name: "Explore",
            icon:<GiSpikyExplosion />,
            path: "/dashboard"
        },
        {
            id:3,
            name: "Upgrade",
            icon:<GiUpgrade />,
            path: "/dashboard"
        },
        {
            id:4,
            name: "Logout",
            icon:<CiLogout />,
            path: "/logout"
        },
    ]
  return (
    <div className='fixed h-full p-5 shadow-md md:w-64'>
        <Image src={"/logo.svg"} width={160} height={160}/>
        <hr className='my-6'/>
    </div>
  )
}

export default SideBar