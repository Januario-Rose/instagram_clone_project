import { auth, signIn, signOut } from "@/auth";
import HomeTopRow from "@/components/HomeTopRow";
import Preloader from "@/components/Preloader";
import UserHome from "@/components/UserHome";
import Image from "next/image";
import logo from "@/app/google-logo.png";
import igLogo from "@/app/Instagram_logo_2022.svg.webp";
import textLogo from "@/app/ig-text-logo.png";
import { Suspense } from "react";

export default async function Home() {
  const session = await auth();
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div>
        {session && (
          <Suspense fallback={<Preloader/>}>
            <UserHome session={session}/>
          </Suspense>
        )}
      </div>
      <div className="fixed min-w-84 min-h-120 flex items-center justify-center bg-gradient-to-bl from-ig-red to-ig-orange rounded-4xl">
        {!session && (
        <form 
        className=""
        action={async () => {
          'use server';
          await signIn('google');
        }}>
          <div className="flex flex-col items-center">
            <Image 
            className="size-18"
            src={igLogo} alt=""/>
            <Image 
            className="size-50 w-2/3 invert border-b-2 border-b-black"
            src={textLogo} alt=""/>
          </div>
          <div className="mb-4 mt-4 px-18 font-bold text-white">Please sign In with Google</div>
          <div className="px-16">
            <button
            className="border px-4 py-2 bg-white text-white rounded-full flex justify-center items-center"
            type="submit">
            <Image className="size-12" src={logo} alt=""/>
              <p className="ml-2 text-slate-500">Sign in with Google</p>
            </button>
          </div>
        </form>
        )}

      </div>

      </div>
  );
}
