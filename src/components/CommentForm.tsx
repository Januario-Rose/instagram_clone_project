'use client';
import { postComment } from "@/actions";
import { TextArea, Button } from "@radix-ui/themes";
import ProfileImage from "./ProfileImage";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function CommentForm({profileImage,postId}:{profileImage:string;postId:string}){
    const router = useRouter();
    const areaRef = useRef<HTMLTextAreaElement>(null);
    return(
        <form action={async data =>{
            if(areaRef.current){
                areaRef.current.value = '';
            }
            await postComment(data);
            router.refresh();
        }}>
            <input type="hidden" name="postId" value={postId}/>
            <div className="flex gap-2">
                <div>
                    <ProfileImage src={profileImage}/>
                </div>
                <div className="w-full flex flex-col gap-2">
                    <TextArea
                    ref={areaRef}
                    name="text"
                    placeholder="Add a comment..."/>
                    <div className="flex justify-end">
                        <Button color="ruby">Post comment</Button>

                    </div>
                </div>
            </div>
            
        </form>
    );
}