'use client';
import { followProfile, unfollowProfile } from "@/actions";
import { Follower } from "@prisma/client";
import { Button } from "@radix-ui/themes";
import { UserMinusIcon, UserPlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FollowButton({
    profileIdToFollow,
    ourFollow=null,
}:{
    profileIdToFollow:string;
    ourFollow:Follower|null;
}){
    const router = useRouter();
    const [isFollowed, setIsFollowed] = useState<boolean>(!!ourFollow);
    return(
        <form action={async () => {
            setIsFollowed(prev => !prev);
            if(isFollowed) {
                //unfollow
                await unfollowProfile(profileIdToFollow);
            } else {
                //follow
                await followProfile(profileIdToFollow);
            }
            router.refresh();
        }}>
            <Button 
            size="3"
            color={isFollowed ? "gray" : "blue"}>
                {isFollowed ? <UserMinusIcon/>:<UserPlusIcon/>}
                {isFollowed ? 'Following':'Follow'}
            </Button>
        </form>
    );
}