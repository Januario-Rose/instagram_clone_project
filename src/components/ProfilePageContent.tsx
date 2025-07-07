import { CircleArrowLeftIcon, BadgeCheckIcon, SettingsIcon, UserPlusIcon } from "lucide-react";
import { Suspense } from "react";
import ProfilePosts from "./ProfilePosts";
import { Follower, Profile } from "@prisma/client";
import Link from "next/link";
import { Button } from "@radix-ui/themes";
import FollowButton from "./FollowButton";
import Preloader from "./Preloader";
import ProfilePageInfo from "./ProfilePageInfo";
import ProfileNav from "./ProfileNav";

export default function ProfilePageContent({
    profile,
    isOurProfile=false,
    ourFollow=null,
}:{
    profile:Profile;
    isOurProfile?:boolean;
    ourFollow:Follower|null;
}){
    return(
        <main>
            <ProfilePageInfo
            profile={profile}
            isOurProfile={isOurProfile}
            ourFollow={ourFollow}/>

            <ProfileNav 
            username={profile.username || ''}
            isOurProfile={isOurProfile}/>

            <section className="mt-4">
                <Suspense fallback={<Preloader/>}>
                    <ProfilePosts email={profile.email}/>

                </Suspense>
            </section>
        </main>
    );
}