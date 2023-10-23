import PostsDetails from "@/components/PostDetail";
import AppLayout from "@/app/layouts/AppLayout";
import NavBar from "@/components/NavBar";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { ReactionsType } from "@/types/reactionsTypes";
import { PostTypes } from "@/types/storeTypes";
export const dynamic = "force-dynamic";
import { UserTypes } from "@/types/userTypes";
import { redirect } from "next/navigation";
import Comments from "@/components/Comments";
import ReadComments from "@/components/ReadComments";

const getUserSession = async () => {
    const supabase = createServerComponentClient({ cookies });
    const { data: users, error } = await supabase.from("users").select("*");

    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (session === null) {
        redirect("/login");
        return null;
    }

    const matchingUser = users?.find(
        (user: UserTypes) => user.id === session.user.id
    );
    const userProfilePic = matchingUser?.profile_pic ?? null;

    return {
        session,
        userProfilePic,
    };
};

export default async function Posts({
    params: { post_id },
}: {
    params: { post_id: string };
}) {
    const supabase = createServerComponentClient({ cookies });
    const sessionData = await getUserSession();
    if (sessionData === null) return null;
    const { session, userProfilePic } = sessionData;
    const { data: posts, error } = await supabase
    .from("posts")
    .select("*, users(*)")
    .order("created_at", { ascending: false });

    // Set the default value of filteredPosts to all posts
    let filteredPosts = posts;

    const { data: reactions } = await supabase.from("reactions").select("*");

    const {
        data: { user },
    } = await supabase.auth.getUser();

    // if (!reactions || !filteredPosts) return null;

    // Calculate reactions count for each post
    const postsWithReactionsCount = filteredPosts.map((post: PostTypes) => {
        const postReactions = reactions.filter(
            (reaction: ReactionsType) => reaction.post_id === post.post_id
        );
        const reactionsCount = postReactions.length;
        return { post_id: post.post_id, reactionsCount: reactionsCount };
    });

    return (
        <>
            <NavBar />
            <AppLayout>
                <PostsDetails 
                    params={{ post_id }} 
                    user={user} 
                    reactions={reactions} 
                    postsWithReactionsCount={postsWithReactionsCount}
                /> 
                <Comments profile_pic={userProfilePic} post_id={post_id}/>
                <ReadComments profile_pic={userProfilePic} post_id={post_id}/>
            </AppLayout>
        </>
    );
}
