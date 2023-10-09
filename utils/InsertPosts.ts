import { supabase } from "../utils/supabaseClient";
import { PostTypes } from "../types/storeTypes";

type UpdatePostsTypes = {
    postId: string;
    contentStr: string;
};

export default async function InsertPosts({postId, contentStr}: UpdatePostsTypes): Promise<PostTypes[] | null> {
    const { data: updatedPost, error } = await supabase
        .from("posts")
        .update({ content: contentStr })
        .eq("post_id", postId)
        .select();
    return updatedPost as PostTypes[] | null;
}