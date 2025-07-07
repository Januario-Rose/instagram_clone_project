import Comment from "@/components/Comment";
import { BookmarkIcon, MessageCircleIcon } from "lucide-react";
import { Suspense } from "react";
import LikesInfo from "./LikesInfo";
import SessionCommentForm from "./SessionCommentForm";
import { Bookmark, Comment as CommentModel, Like, Post, Profile } from "@prisma/client";
import Preloader from "./Preloader";
import Bookmarks from "./Bookmarks";

export default async function SinglePostContent({
    post,
    authorProfile,
    comments,
    commentsAuthors,
    myLike,
    myBookmark,
}:{
    post: Post;
    authorProfile: Profile;
    comments: CommentModel[];
    commentsAuthors: Profile[];
    myLike: Like|null;
    myBookmark: Bookmark|null;
}){
    return(
        <div>
            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <img 
                    className="rounded-md"
                    src={post.image} alt={post.description} />
                </div>
                <div>
                    <Comment 
                    createdAt={post.createdAt}
                    text={post.description} authorProfile={authorProfile}/>
                    <div className="pt-4 flex flex-col gap-4">
                        {comments.map(comment => (
                            <div key={comment.id}>
                                <Comment 
                                createdAt={comment.createdAt}
                                text={comment.text} 
                                authorProfile={commentsAuthors.find(a => a.email === comment.author)}/>
                            </div>
                        ))}
                    </div>
                    <div className="flex text-gray-700 items-center justify-between gap-2 py-4 mt-4 border-t border-t-gray-300">
                        <LikesInfo post={post} sessionLike={myLike}/>
                        <MessageCircleIcon/>
                        <div className="flex items-center">
                            <Bookmarks 
                            post={post}
                            sessionBookmark={myBookmark}/>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-t-gray-300">
                        <Suspense fallback={<Preloader/>}>
                            <SessionCommentForm postId={post.id}/>
                        </Suspense>
                        
                    </div>
                </div>
            </div>
            
        </div>
    );
}