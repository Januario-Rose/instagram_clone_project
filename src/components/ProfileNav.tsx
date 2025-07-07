'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ProfileNav({
    isOurProfile=false,
    username,
}:{
    isOurProfile:boolean;
    username:string;
}){
    const path = usePathname();
    const bookmarkedActive = path.includes('/bookmarked');
    const highlightsActive = path.includes('/highlights');
    const postsActive = !bookmarkedActive && !highlightsActive;
    return(
        <section className="mt-4">
            <div className="flex justify-center gap-4 font-bold">
                <Link 
                className={postsActive ? "text-black dark:text-white":"text-gray-400"}
                href={isOurProfile ? '/profile':`/${username}`}>
                    Posts
                </Link>
                {isOurProfile && (
                    <Link 
                    className={bookmarkedActive ? "text-black dark:text-white":"text-gray-400"}
                    href={'/profile/bookmarked'}>
                        Saved
                    </Link>
                )}

            </div>
        </section>
    );
}