// src/app/pages/page.tsx
import FetchPosts from "../utils/FetchPosts";
import FetchReactions from "../utils/FetchReactions";
import Avatar from "./Avatar";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { PiShareFatLight } from "react-icons/pi";
import { BiRepost, BiDotsVerticalRounded, BiGridSmall } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";

import Reaction from "./Reaction";
import ReactionsSummary from "./ReactionsSummary";

export const dynamic = 'force-dynamic'

const ProfileFeed = async () => {
    const posts = await FetchPosts();
    const reactions = await FetchReactions();
    const supabase = createServerComponentClient({ cookies });

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const filteredPosts =
        posts?.filter((post) => post.users.id === user?.id) || [];

    if (!reactions || !filteredPosts) return null;

    // Calculate reactions count for each post
    const postsWithReactionsCount = filteredPosts.map((post) => {
        const postReactions = reactions.filter(
            (reaction) => reaction.post_id === post.post_id
        );
        const reactionsCount = postReactions.length;
        return { post_id: post.post_id, reactionsCount: reactionsCount };
    });

    function formatElapsedTime(postDate: Date): string {
        const currentDate = new Date();
        const elapsedMilliseconds = currentDate.getTime() - postDate.getTime();
        const elapsedMinutes = Math.floor(elapsedMilliseconds / (1000 * 60));
        const elapsedHours = Math.floor(elapsedMinutes / 60);
        const elapsedDays = Math.floor(elapsedHours / 24);

        if (elapsedDays > 0) {
            const formattedDate = postDate.toLocaleString("en-US", {
                month: "short",
                day: "numeric",
            });
            return `${formattedDate}`;
        } else if (elapsedHours > 0) {
            return `${elapsedHours}h${elapsedHours === 1 ? "" : ""}`;
        } else if (elapsedMinutes > 0) {
            return `${elapsedMinutes}m${elapsedMinutes === 1 ? "" : ""}`;
        } else {
            return "Just now";
        }
    }

    function formatDate(postDate: Date): string {
        const currentDate = new Date();
        const elapsedMilliseconds = currentDate.getTime() - postDate.getTime();
        const elapsedMinutes = Math.floor(elapsedMilliseconds / (1000 * 60));

        if (elapsedMinutes < 60) {
            if (elapsedMinutes < 1) {
                return "Just now";
            } else {
                return `${elapsedMinutes}m${elapsedMinutes === 1 ? "" : ""}`;
            }
        } else {
            const elapsedHours = Math.floor(elapsedMinutes / 60);
            const formattedDate = postDate.toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
                month: "short",
                day: "numeric",
                year: "numeric",
            });
            return `${elapsedHours}h${
                elapsedHours === 1 ? "" : "s"
            } · ${formattedDate}`;
        }
    }
    return (
        <div className="flex flex-col border-x-[1px] border-gray-400 border-opacity-20">
            {posts &&
                // filteredPosts.map((post) => (
                filteredPosts.map((post) => (
                    <div
                        key={post.post_id}
                        className="p-6 w-full h-full border-b-[1px] border-gray-400 border-opacity-20"
                    >
                        <div className="flex flex-col">
                            <div className="flex">
                                <Avatar profile_pic={post.users.profile_pic} />
                                <div className="flex flex-col gap-2 justify-center items-center w-full ml-2">
                                    <div className="flex w-full justify-between items-center pl-2">
                                        <div className="flex gap-2 items-center">
                                            <p>@{post.users.username}</p>
                                            <span
                                                className="text-gray-400 text-sm"
                                                title={formatDate(
                                                    new Date(post.created_at)
                                                )}
                                            >
                                                {formatElapsedTime(
                                                    new Date(post.created_at)
                                                )}
                                            </span>
                                        </div>
                                        <div>
                                            <BsThreeDots />
                                        </div>
                                    </div>

                                    <p className="w-full p-2 break-all">
                                        {post.content}
                                    </p>
                                    <div className="w-full pl-2">
                                        <ReactionsSummary />
                                    </div>
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
                                                reactions={reactions}
                                                postId={post.post_id}
                                                reactionsCount={postsWithReactionsCount.find(item => item.post_id === post.post_id)?.reactionsCount}
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
                ))}
        </div>
    );
};

export default ProfileFeed;
