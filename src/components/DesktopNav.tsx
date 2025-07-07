import { CameraIcon, HomeIcon, LayoutGridIcon, SearchIcon, UserCircleIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import logo from "../public/ig-logo.webp";
import textLogo from "../public/ig-text-logo.png";

export default function DesktopNav(){
    return(
        <div className="hidden lg:block px-4 py-4 w-50 shadow-md shadow-gray-400 dark:shadow-gray-100">
              <div className="top-4 sticky">
                <Image src={logo} alt=""/>
                <Image className="dark:invert" src={textLogo} alt=""/>
                <div className="ml-1 inline-flex flex-col gap-8 mt-6 *:flex *:items-center *:gap-2 *:text-gray-700 dark:*:text-gray-400">
                    <Link className="hover:text-black dark:hover:text-white" href={'/'}>
                      <HomeIcon/>
                      Home
                    </Link> 
                    <Link className="hover:text-black dark:hover:text-white" href={'/search'}>
                      <SearchIcon/>
                      Search
                    </Link> 
                    <Link className="hover:text-black dark:hover:text-white" href={'/browse'}>
                      <LayoutGridIcon/>
                      Browse
                    </Link> 
                    <Link className="hover:text-black dark:hover:text-white" href={'/profile'}>
                      <UserCircleIcon/>
                      Profile
                    </Link> 
                    <Link className="hover:text-black dark:hover:text-white" href={'/create'}>
                      <CameraIcon/>
                      Create
                    </Link> 

                </div>
              </div>
              
            </div>
    );
}