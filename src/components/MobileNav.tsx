import { CameraIcon, HomeIcon, LayoutGridIcon, SearchIcon, UserCircleIcon } from "lucide-react";
import Link from "next/link";

export default function MobileNav(){
    return(
        <div className="block lg:hidden fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
            <div className="pr-8 pl-8 h-20 bg-white dark:bg-black border-t border-gray-200 shadow-t rounded-t-3xl flex items-center justify-between px-6 pointer-events-auto">
              <Link
                href="/create"
                className="absolute top-9 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-bl from-ig-orange to-ig-red text-white flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110 z-20"
              >
                <CameraIcon className="w-6 h-6" />
              </Link>

              <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white w-10 h-10 flex items-center justify-center">
                <HomeIcon className="w-6 h-6" />
              </Link>

              <Link href="/search" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white w-10 h-10 flex items-center justify-center">
                <SearchIcon className="w-6 h-6" />
              </Link>

              <div className="w-16" />

              <Link href="/browse" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white w-10 h-10 flex items-center justify-center">
                <LayoutGridIcon className="w-6 h-6" />
              </Link>

              <Link href="/profile" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white w-10 h-10 flex items-center justify-center">
                <UserCircleIcon className="w-6 h-6" />
              </Link>
            </div>
          </div>
    );
}