import { auth } from "@/auth";
import PostGrid from "@/components/PostGrid";
import ProfilePageContent from "@/components/ProfilePageContent";
import ProfilePosts from "@/components/ProfilePosts";
import { prisma } from "@/db";
import { BadgeCheckIcon, CircleArrowLeftIcon, SettingsIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function ProfilePage(){
    const session = await auth();
    const profile = await prisma.profile.findFirst({where: {email: session?.user?.email as string,}});
    if (!profile){
        return redirect('/settings');
    }
    return(
        <ProfilePageContent ourFollow={null} profile={profile} isOurProfile={true}/>
    );
}