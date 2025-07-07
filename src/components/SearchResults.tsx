import { prisma } from "@/db";
import ProfileImage from "./ProfileImage";
import Link from "next/link";
import { Avatar } from "@radix-ui/themes";
import PostGrid from "./PostGrid";

export default async function SearchResults({query}:{query:string}) {
    const profiles = await prisma.profile.findMany({
        where:{
            OR: [
              {username: {contains: query},},
              {name: {contains: query},},  
            ],
        },
        take: 10,
    });
    const posts = await prisma.post.findMany({
        where: {
            description: {contains:query},
        },
        take: 100,
    });
    return(
        <div>
            <h1 className="text-lg mt-4 dark:text-white">
                Search results for "{query}"
            </h1>
            {profiles?.length > 0 && (
                <div className="grid mt-4 sm:grid-cols-2 gap-2">
                    {profiles.map(profile => (
                        <Link 
                        href={`/users/${profile.username}`} 
                        className="flex gap-2 bg-gradient-to-b from-ig-red/60 to-ig-orange/50 dark:bg-gradient-to-b dark:from-ig-red dark:to-ig-orange  border border-gray-300 dark:border-white p-2 rounded-full"
                        >
                            <div className="">
                                <Avatar
                                size="4"
                                radius="full"
                                fallback="user profile image"
                                src={profile.profileImage || ''}
                                />
                            </div>
                            <div>
                                <h3 className="font-light dark:text-white">{profile.name}</h3>
                                <h4 className="text-ig-red/75 dark:text-ig-red text-sm">
                                    @{profile.username}
                                </h4>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
            <div className="mt-4">
                <PostGrid posts={posts}/>
            </div>
        </div>
    );
}