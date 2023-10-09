// src/app/pages/page.tsx
import FetchPosts from "../utils/FetchPosts";
import Avatar from "./Avatar";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const ProfileFeed = async () => {
    const posts = await FetchPosts();
    const supabase = createServerComponentClient({ cookies });
    // console.log("posts: ", posts)

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const filteredPosts =
        posts?.filter((post) => post.users.id === user?.id) || [];

    // return (
    //     <div className="flex flex-col p-4 gap-4">
    //         {posts &&
    //             posts.map((post) => (
    //                 <div key={post.post_id} className="">
    //                     <div className="">
    //                         <Avatar profile_pic={post.users.profile_pic} />
    //                         <p>Username: {post.users.username}</p>
    //                         <p className="">Content: {post.content}</p>
    //                         <p className="text-gray-400 text-sm">
    //                             Date: {post.created_at}
    //                         </p>
    //                         <p className="text-gray-400 text-sm">
    //                             Id: {post.post_id}
    //                         </p>
    //                         {/* <div className="mt-4">
    //                             <pre>{JSON.stringify(post, null, 2)}</pre>
    //                         </div> */}
    //                     </div>
    //                 </div>
    //             ))}
    //     </div>
    // );

    // function formatDate(isoDate: string): string {
    //     const date = new Date(isoDate);
    //     const year = date.getFullYear();
    //     const month = String(date.getMonth() + 1).padStart(2, "0");
    //     const day = String(date.getDate()).padStart(2, "0");
    //     return `${year}-${month}-${day}`;
    // }

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
            return `${elapsedMinutes}m${
                elapsedMinutes === 1 ? "" : ""
            }`;
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
                return `${elapsedMinutes}m${
                    elapsedMinutes === 1 ? "" : ""
                }`;
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
        <div className="flex flex-col p-4 gap-4">
            {posts &&
                filteredPosts.map((post) => (
                    <div key={post.post_id} className="">
                        <div className="">
                            <Avatar profile_pic={post.users.profile_pic} />
                            <p>Username: {post.users.username}</p>
                            <p className="">Content: {post.content}</p>
                            <p
                                className="text-gray-400 text-sm"
                                title={formatDate(new Date(post.created_at))}
                            >
                                Date:{" "}
                                {formatElapsedTime(new Date(post.created_at))}
                            </p>
                            {/* <p className="text-gray-400 text-sm">
                                Id: {post.post_id}
                            </p> */}
                            <div className="self-end w-1/4 flex justify-center bg-teal-200 text-gray-600 rounded-sm">
                                Edit
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default ProfileFeed;
