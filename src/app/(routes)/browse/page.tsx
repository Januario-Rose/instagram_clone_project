import PostGrid from "@/components/PostGrid";
import { prisma } from "@/db";

export default async function BrowsePage(){
    const posts = await prisma.post.findMany({
        orderBy: {createdAt: 'desc'},
        take: 100,
    })
    return(
        <div>
            <div className="mb-4">
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
                    Explore
                </h1>
                <p className="text-gray-400 mt-2">Latest trending updates</p>
            </div>
            <PostGrid posts={posts}/>
        </div>
    );
}