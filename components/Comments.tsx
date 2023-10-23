import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Avatar from "./Avatar";
import { revalidatePath } from "next/cache";
import ComposePostTextArea from "./compose-post-textarea";

type ComposePostType = {
    profile_pic: string | null;
    post_id?: string;
};

export const dynamic = "force-dynamic";

const Comments = ({ profile_pic, post_id }: ComposePostType) => {
    const addPost = async (formData: FormData) => {
        "use server";
        // console.log("add post works!")
        const content = formData.get("content");
        if (content === null) return;

        const supabase = createServerActionClient({ cookies });
        // revisar si el usuario esta logeado
        const { data: user } = await supabase.auth.getUser();
        // const userId = user?.user?.id;
        if (user === null) return;
        await supabase
            .from("comments")
            .insert([{ comment_content: content, commenter_id: user?.user?.id, post_id: post_id }]);

        revalidatePath("/");
    };
    return (
        <form
            action={addPost}
            className="flex flex-1 flex-col gap-y-4 border-x-[1px] border-b-[1px] border-gray-400 border-opacity-20"
        >
            <div className="flex p-4 justify-center">
                <div className="scale-[100%]">
                <Avatar profile_pic={profile_pic} w={48} h={48}/>
                </div>
                <div className="flex flex-1 flex-col gap-y-4">
                    <ComposePostTextArea />
                    {/* <button className="post-button">Post</button>
                     */}
                    <button className="w-[90px] self-end rounded-2xl m-2 bg-twitterColor p-2 text-lg text-anomalie-dark-blue hover:bg-opacity-70 transition duration-200 bg-anomalie-cyan">
                        Post
                    </button>
                </div>
            </div>
        </form>
    );
};

export default Comments;
