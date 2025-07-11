import { auth, signIn } from "@/auth";
import Preloader from "@/components/Preloader";
import UserHome from "@/components/UserHome";
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
            
            <img 
            className="size-50 w-2/3 invert border-b-2 border-b-black"
            src="/ig-text-logo.png" alt=""/>
          </div>
          <div className="mb-4 mt-4 px-18 font-bold text-white">Please sign In with Google</div>
          <div className="px-16">
            <button
            className="border px-4 py-2 bg-white text-white rounded-full flex justify-center items-center"
            type="submit">
            <img className="size-12" src="/google-logo.png" alt=""/>
              <p className="ml-2 text-slate-500">Sign in with Google</p>
            </button>
          </div>
        </form>
        )}

      </div>

      </div>
  );
}
