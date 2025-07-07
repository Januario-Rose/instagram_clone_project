import { Follower, Profile } from "@prisma/client";
import { CircleArrowLeftIcon, BadgeCheckIcon, SettingsIcon } from "lucide-react";
import FollowButton from "./FollowButton";
import Link from "next/link";

export default function ProfilePageInfo({
    profile,
    isOurProfile,
    ourFollow,
}:{
    profile:Profile;
    isOurProfile?:boolean;
    ourFollow:Follower|null;
}) {
    return(
        <div>
            <section className="flex justify-between items-center dark:text-white">
                <button>
                    <CircleArrowLeftIcon/>
                </button>
                <div className="font-bold flex items-center gap-2">
                    {profile.username}
                    <div className="size-5 rounded-full bg-ig-red inline-flex justify-center items-center text-white">
                        <BadgeCheckIcon />
                    </div>
                </div>
                <div>
                    {isOurProfile && (
                        <Link href={'/settings'}>
                            <SettingsIcon/>
                        </Link>
                    )}
                </div>
            </section>

            <section className="mt-8 flex justify-center">
                <div className="size-48 p-2 rounded-full bg-gradient-to-tr from-ig-orange to-ig-red">
                    <div className="size-44 p-2 rounded-full bg-white dark:bg-black">
                        <div className="size-40 aspect-square overflow-hidden rounded-full">
                            <img 
                            className="w-full h-full object-cover"
                            src={profile.profileImage || ''} 
                            alt="" />

                        </div>

                    </div>

                </div>

            </section>

            <section className="text-center mt-4">
                <h1
                className="text-xl font-bold dark:text-white"
                >{profile.name}</h1>
                <p
                className="text-gray-500 mt-1 mb-1"
                >{profile.subtitle}</p>
                <p className="dark:text-white">
                    {profile.bio}
                </p>

            </section>

            {!isOurProfile && (
                <section className="flex justify-center my-3">
                    <FollowButton
                    ourFollow={ourFollow}
                     profileIdToFollow={profile.id}/>
                </section>
            )}
        </div>
    );
}