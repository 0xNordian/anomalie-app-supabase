import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const addPost = async (formData: FormData) => {
    "use server";

    const content = formData.get("content");
    if (content === null) return;

    const supabase = createServerActionClient({ cookies });
    const { data: user } = await supabase.auth.getUser();
    if (user === null) return;
    await supabase
        .from("posts")
        .insert([{ content, author_id: user?.user?.id }]);

    revalidatePath("/");
};