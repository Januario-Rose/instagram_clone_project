import { getSessionEmailOrThrow } from "@/actions";
import { prisma } from "@/db";
import { Follower, Profile } from "@prisma/client";
import { Avatar } from "@radix-ui/themes";
import LikesInfo from "./LikesInfo";
import { MessageCircleIcon } from "lucide-react";
import Link from "next/link";
import Bookmarks from "./Bookmarks";

export default async function HomePosts({
    follows,
    profiles,
}:{
    follows: Follower[];
    profiles: Profile[];
}){
    const posts = await prisma.post.findMany({
        where:{
            author: {in: profiles.map(p => p.email)},
        },
        orderBy:{
            createdAt: 'desc',
        },
        take: 100,
    });
    const likes = await prisma.like.findMany({
        where:{
            author: await getSessionEmailOrThrow(),
            postId: {in: posts.map(p => p.id)},
        }
    });
    const bookmarks = await prisma.bookmark.findMany({
        where:{
            author: await getSessionEmailOrThrow(),
            postId: {in: posts.map(p => p.id)},
        }
    });
    return(
        <div className="max-w-md mx-auto flex flex-col gap-12 mb-6">
            {posts.map(post => {
                const profile = profiles.find(p => p.email === post.author);
            return(
                <div 
                className="border-t border-t-gray-600 dark:border-t-white"
                key={post.id}>
                    <div className="flex items-center gap-2 mb-4 mt-4">
                        <Link
                        href={`/users/${profile?.username}`}>
                            <Avatar
                            radius="full"
                            src={profile?.profileImage || ''}
                            size="3"
                            fallback="profileImage" />
                        </Link>
                        <Link 
                        href={`/users/${profile?.username}`}
                        className="font-extralight text-sm text-black dark:text-white">{profile?.name}</Link>
                    </div>
                    <div className="bg-gradient-to-tr from-ig-orange to-ig-red rounded-xl">
                        <Link href={`/posts/${post.id}`}>
                            <img
                            className="block shadow shadow-black dark:shadow-white rounded-bl-full rounded-tr-full" 
                            src={post.image} alt="" />
                        </Link>

                    </div>
                    <div className="px-4 mt-4 flex items-center justify-between">
                        <LikesInfo 
                        post={post}
                        showText={false}
                        sessionLike={likes.find(like => like.postId === post.id) || null}/>
                        <Link
                        href={`/posts/${post.id}`}>
                            <MessageCircleIcon className="hover:text-black dark:text-gray-400 dark:hover:text-white hover:scale-150"/>
                        </Link>
                        <Bookmarks
                        post={post}
                        sessionBookmark={bookmarks.find(b => b.postId === post.id) || null} />
                    </div>
                    <p 
                    className="px-4 py-2 mt-4 text-gray-700 dark:text-gray-200 border-t border-dotted border-t-gray-300">
                        {post.description}</p>
                </div>
            );})}
        </div>
    );
}