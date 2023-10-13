import { redirect } from "next/navigation";
import FetchUsers from "@/utils/FetchUsers";
import { supabase } from "@/utils/supabaseClient";

export const getUserSession = async () => {
    const users = await FetchUsers();

    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (session === null) {
        redirect("/login");
        return null;
    }

    const matchingUser = users?.find((user) => user.id === session.user.id);
    const userProfilePic = matchingUser?.profile_pic ?? null;

    return {
        session,
        userProfilePic,
    };
};