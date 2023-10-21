"use client";
import supabase from "@/utils/supabase";
import { notFound } from "next/navigation";
import { PiShareFatLight } from "react-icons/pi";
import { BiRepost } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import Avatar from "@/components/Avatar";
import { useEffect, useState } from "react";
import { PostTypes } from "@/types/storeTypes";
import { ReactionsType } from "@/types/reactionsTypes";

import Reaction from "./Reaction";
import { UserSessionType } from "@/types/UserSession";

/*
Warning: For production Image Optimization with Next.js, the optional 'sharp' package is strongly recommended. Run 'npm i sharp', and Next.js will use it automatically for Image Optimization.
Read more: https://nextjs.org/docs/messages/sharp-missing-in-production
*/

export const revalidate = 0;

const fetchPost = async (postId: string): Promise<PostTypes | null> => {
    const { data: post, error } = await supabase
        .from("posts")
        .select("*, users(*)")
        .match({ post_id: postId })
        .single();
    // Check for errors or null value
    if (error || !post) {
        return null;
    }

    // Cast the fetched data to the PostTypes type
    const typedPost: PostTypes = post as PostTypes;

    return typedPost;
};

export default function PostsDetails({
    params: { post_id },
    user,
    reactions,
    postsWithReactionsCount
}: {
    params: { post_id: string };
    user: any,
    reactions: ReactionsType[],
    postsWithReactionsCount: any[]
}) {
    const [post, setPost] = useState<PostTypes | null>(null);

    useEffect(() => {
        (async () => {
            const postData = await fetchPost(post_id);
            if (!postData) {
                notFound();
            } else {
                setPost(postData);
            }
        })();
    }, [post_id]);

    if (!post) {
        return null;
    }

    return (
        <>
                <div className="flex flex-col border-x-[1px] border-gray-400 border-opacity-20">
                    <div
                        key={post.post_id}
                        className="p-6 min-w-[700px] w-full h-full border-b-[1px] border-gray-400 border-opacity-20"
                    >
                        <div className="flex flex-col">
                            <div className="flex">
                                <div className="scale-[100%]">
                                    <Avatar
                                        profile_pic={post.users.profile_pic}
                                        w={48}
                                        h={48}
                                    />
                                </div>
                                <div className="flex flex-col gap-2 justify-center items-center w-full ml-2">
                                    <div className="flex w-full justify-between items-center pl-2">
                                        <div className="flex gap-2 items-center">
                                            <p>@{post.users.username}</p>
                                            {/* <span
                                                className="text-gray-400 text-sm hover:text-gray-500 cursor-help"
                                                title={formatDate(
                                                    new Date(post.created_at)
                                                    )}
                                                    >
                                                    {formatElapsedTime(
                                                        new Date(post.created_at)
                                                        )}
                                                    </span> */}
                                        </div>
                                        <div>
                                            <BsThreeDots />
                                        </div>
                                    </div>

                                    <p className="w-full p-2 break-all">
                                        {post.content}
                                    </p>

                                    {/* <div className="w-full pl-2">
                                        <ReactionsSummary />
                                    </div> */}
                                    <div
                                        id="reactions"
                                        className="flex w-full justify-between items-center p-2 text-[1.2rem]"
                                    >
                                        <div className="scale-[1] hover:scale-[1.1]">
                                            <FaRegComment />
                                        </div>
                                        <div className="scale-[1.25] hover:scale-[1.35]">
                                            <BiRepost />
                                        </div>
                                        <div className="scale-[1] hover:scale-[1.1] flex justify-center items-center gap-1">
                                        <Reaction
                                                    authUser={user as UserSessionType}
                                                    reactions={reactions}
                                                    postId={post.post_id}
                                                    reactionsCount={
                                                        postsWithReactionsCount.find(
                                                            (item: {
                                                                post_id: string;
                                                                reactionsCount: number;
                                                            }) =>
                                                                item.post_id ===
                                                                post.post_id
                                                        )?.reactionsCount
                                                    }
                                                />
                                        </div>
                                        <div className="scale-[1] hover:scale-[1.1]">
                                            <PiShareFatLight />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="self-end w-1/4 flex justify-center bg-teal-200 text-gray-600 rounded-sm">
                                Edit
                            </div> */}
                        </div>
                    </div>
                </div>
        </>
    );
}
