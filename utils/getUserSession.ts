import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { UserTypes } from "@/types/userTypes";

export const getUserSession = async () => {
    const supabase = createServerComponentClient({ cookies });
    const { data: users, error } = await supabase.from("users").select("*");

    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (session === null) {
        redirect("/login");
        return null;
    }

    const matchingUser = users?.find(
        (user: UserTypes) => user.id === session.user.id
    );
    const userProfilePic = matchingUser?.profile_pic ?? null;

    return {
        session,
        userProfilePic,
        matchingUser,
    };
};