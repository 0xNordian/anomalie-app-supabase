import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Avatar from "./Avatar";
import { revalidatePath } from "next/cache";
import ComposePostTextArea from "./compose-post-textarea";

type ComposePostType = {
    profile_pic: string | null;
};

const ComposePost = ({ profile_pic }: ComposePostType) => {
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
            .from("posts")
            .insert([{ content, user_id: user?.user?.id }]);

        revalidatePath("/");
    };
    return (
        <form action={addPost} className="flex flex-1 flex-col gap-y-4 border-x-[1px] border-b-[1px] border-gray-400 border-opacity-20">
            <div className="flex p-4 justify-center">

            <Avatar profile_pic={profile_pic} />
            <div className="flex flex-1 flex-col gap-y-4">
                <ComposePostTextArea />
                <button className="post-button">Post</button>
            </div>
            </div>
        </form>
    );
};

export default ComposePost;
