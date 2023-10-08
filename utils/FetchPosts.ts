import { supabase } from "../utils/supabaseClient";
import { PostTypes } from "../types/storeTypes";

export default async function FetchPosts(): Promise<PostTypes[] | null> {
    const { data: posts, error } = await supabase
    .from("posts")
    .select('*, users(*)')
    .order('created_at', { ascending: false });
    return posts as PostTypes[] | null;
}