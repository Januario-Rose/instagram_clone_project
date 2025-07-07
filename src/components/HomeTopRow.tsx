import ProfileImage from "./ProfileImage";
import { PlusIcon } from "lucide-react";
import { Follower, Profile } from "@prisma/client";

export default async function HomeTopRow({
    follows,
    profiles,
}:{
    follows:Follower[];
    profiles:Profile[];
}) {
    
    return(
        <div className="flex gap-3 max-w-full overflow-x-auto">
            <div>
                <button
                className="size-16 bg-gradient-to-br from-ig-red/80 to-ig-orange to rounded-full flex items-center justify-center text-white"
                >
                    <PlusIcon
                    size="34"/>
                </button>
                <p className="text-xs text-center font-light text-gray-400 dark:text-white">New Story</p>
            </div>
            {profiles.map(profile => (
                <div className="w-20 flex-col items-center justify-center">
                    <div className="flex items-center justify-center">
                        <ProfileImage 
                        src={profile.profileImage || ''}
                        />
                    </div>
                    <p className="text-xs  text-center font-light text-gray-400 dark:text-white">{profile.username}</p>
                </div>
                
            ))}
        </div>
    );
}