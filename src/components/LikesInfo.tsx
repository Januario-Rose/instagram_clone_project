'use client';
import { likePost, removeLikeFromPost } from "@/actions";
import { Like, Post } from "@prisma/client";
import { HeartIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LikesInfo({
    post,
    sessionLike,
    showText=true,
}:{
    post:Post;
    sessionLike:Like|null;
    showText?:boolean;
}){
    const router = useRouter();
    const [likedByMe, setLikedByMe] = useState(!!sessionLike);
    return(
        <form 
        action={async (data:FormData) => {
            setLikedByMe(prev => !prev);
            if (likedByMe) {
                //remove like
                await removeLikeFromPost(data);
            }
            else {
                //add like
                await likePost(data);
            }
            router.refresh();
        }}
        className="flex items-center gap-2">
            <input type="hidden" name="postId" value={post.id} />
            <button 
            type="submit" 
            className={likedByMe ? 'text-red-600 hover:scale-150':'hover:text-black dark:hover:text-white dark:text-gray-400 hover:scale-150'}>
                <HeartIcon className={likedByMe ? 'fill-red-600':''}/>
            </button>
            <div className="text-black dark:text-white flex items-center gap-2">
                {post.likesCount}
                {showText && (
                    <p>likes</p>
                )}
            </div>
        </form>
    );
}