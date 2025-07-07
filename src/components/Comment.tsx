import { Profile } from "@prisma/client";
import ProfileImage from "./ProfileImage";
import {format} from "date-fns";

export default function Comment({
    text,
    createdAt,
    authorProfile,
}:{
    text: string;
    createdAt:Date;
    authorProfile?: Profile;
}){
    return(
        <div className="flex gap-2">
            <div>
                <ProfileImage src={authorProfile?.profileImage || ''}/>
            </div>
            <div className="w-full">
                <div className="flex justify-between gap-2">
                    <div>
                        <h3 className="font-extralight flex gap-1 dark:text-white">
                            {authorProfile?.name}
                        </h3>
                        <h4 className="text-ig-red/25 dark:text-ig-red text-sm -mt-1">
                            @{authorProfile?.username}
                        </h4>
                    </div>
                </div>
                <div className="border-t border-t-gray-200 mt-4">
                    <div className="bg-gradient-to-tr from-slate-200 to-white dark:bg-white border border-gray-300 dark:border-white rounded-md p-4 mt-2">
                        <p>
                            {text}
                        </p>
                    </div>
                    <div className="text-xs text-gray-400 dark:text-white text-right">
                        {format(createdAt, 'yyyy-MM-dd HH:mm:ss')}
                    </div>
                </div>
                
            </div>
        </div>
    );
}