'use client';
import { bookmarkPost, unbookmarkPost } from "@/actions";
import { Like, Post } from "@prisma/client";
import { BookmarkIcon} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Bookmarks({
    post,
    sessionBookmark,
}:{
    post:Post;
    sessionBookmark:Like|null;
}){
    const router = useRouter();
    const [bookmarkedByMe, setBookmarkedByMe] = useState(!!sessionBookmark);
    return(
        <form 
        action={async (data:FormData) => {
            setBookmarkedByMe(prev => !prev);
            if (bookmarkedByMe) {
                //remove saved posts
                await unbookmarkPost(post.id);
            }
            else {
                //save posts
                await bookmarkPost(post.id);
            }
            router.refresh();
        }}
        className="flex items-center gap-2">
            <input type="hidden" name="postId" value={post.id} />
            <button 
            type="submit" 
            className={bookmarkedByMe ? 'text-black dark:text-white hover:scale-150':'hover:text-black dark:hover:text-white dark:text-gray-400 hover:scale-150'}>
                <BookmarkIcon className={bookmarkedByMe ? 'fill-black dark:fill-white':''}/>
            </button>
        </form>
    );
}