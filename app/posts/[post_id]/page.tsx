import supabase from "@/utils/supabase";
import { notFound } from "next/navigation";
import { PiShareFatLight } from "react-icons/pi";
import { BiRepost, BiDotsVerticalRounded, BiGridSmall } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import Avatar from "@/components/Avatar";

export const revalidate = 0;

export default async function Posts({
    params: { post_id },
}: {
    params: { post_id: string };
}) {
    const { data: post, error } = await supabase
        .from("posts")
        .select('*, users(*)')
        .match({ post_id })
        .single();
    if (!post) {
        notFound();
    }
    console.log(post);
    return (
        <>
            {/* <pre>{JSON.stringify(post, null, 2)}</pre> */}
            <div className="flex flex-col border-x-[1px] border-gray-400 border-opacity-20">
                    <div
                        key={post.post_id}
                        className="p-6 min-w-[700px] w-full h-full border-b-[1px] border-gray-400 border-opacity-20"
                    >
                        <div className="flex flex-col">
                            <div className="flex">

                                    <Avatar
                                        profile_pic={post.users.profile_pic}
                                    />
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
                                            {/* <Reaction
                                                reactions={reactions}
                                                postId={post.post_id}
                                                reactionsCount={
                                                    postsWithReactionsCount.find(
                                                        (item) =>
                                                            item.post_id ===
                                                            post.post_id
                                                    )?.reactionsCount
                                                }
                                            /> */}
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