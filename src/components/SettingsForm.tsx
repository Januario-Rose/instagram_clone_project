'use client';
import updateProfile from "@/actions";
import { Profile } from "@prisma/client";
import { Button, Switch, TextArea, TextField } from "@radix-ui/themes";
import { UploadIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function SettingsForm({
    profile,
}:{
    profile:Profile|null;
}) {
    const router = useRouter();
    const fileInRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File|null>(null);
    const [isUploading,setIsUploading] = useState(false);
    const [profileImageUrl, setProfileImageUrl] = useState(profile?.profileImage || null);
    useEffect(() => {
        if(file){
            setIsUploading(true);
            const data = new FormData();
            data.set("file", file);
            fetch("/api/upload", {
                method: "POST",
                body: data,
      }).then(response =>{
        response.json().then(url => {
            setProfileImageUrl(url);
            setIsUploading(false);
        });
      });
        }
    },[file]);
    return(
        <form action={async (data:FormData) => {
                await updateProfile(data);
                router.push('/profile');
                router.refresh();
            }}>
                <input type="hidden" name="profileImage" value={profileImageUrl || ''} />
                <div className="flex gap-4 items-center">
                    <div>
                        <div className="bg-gray-400 size-24 rounded-full overflow-hidden shadow-md shadow-gray-400">
                            <img className="w-full h-full object-cover" src={profileImageUrl || ''} alt="" />
                        </div>
                    </div>
                    <div>
                        <input type="file" 
                        ref={fileInRef} 
                        className="hidden" 
                        onChange={ev => setFile(ev.target.files?.[0] || null)}
                        />
                        <Button 
                        /* disabled={isUploading} */
                        type="button"
                        variant="outline"
                        onClick={() => fileInRef.current?.click()}
                        >
                            {!isUploading &&(
                                <UploadIcon/>)}
                                <div className="dark:text-blue-700">
                                    {isUploading ? "Uploading...":"Change profile picture"}
                                </div>
                        </Button>
                    </div>
                </div>
                <p className="mt-2 font-bold dark:text-white">
                    username
                </p>
                <TextField.Root 
                name="username"
                defaultValue={profile?.username || ''}
                placeholder="your_username"/>
                <p className="mt-2 font-bold dark:text-white">
                    name
                </p>
                <TextField.Root 
                name="name"
                defaultValue={profile?.name || ''}
                placeholder="John Doe"/>
                <p className="mt-2 font-bold dark:text-white">
                    subtitle
                </p>
                <TextField.Root 
                name="subtitle"
                defaultValue={profile?.subtitle || ''}
                placeholder="Graphic Designer"/>
                <p className="mt-2 font-bold dark:text-white">
                    bio
                </p>
                <TextArea name="bio" defaultValue={profile?.bio || ''}/>
                <label className="flex gap-2 items-center justify-end mt-4 text-sm font-sans">
                    <span className="dark:text-white">Dark Mode</span>
                    <Switch 
                    defaultChecked ={localStorage.getItem('theme') == 'dark'}
                    onCheckedChange={(isDark) => {
                        const html = document.querySelector('html');
                        const theme = isDark? 'dark' : 'light';
                        if(html) {
                            html.dataset.theme = theme;
                        }

                        localStorage.setItem('theme', theme);
                        window.location.reload();
                    }}/>
                </label>
                <div className="mt-4 flex justify-center">
                    <Button variant="solid">Save changes</Button>
                </div>

            </form>
    );
}