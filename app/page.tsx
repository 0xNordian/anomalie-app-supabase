import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AppLayout from "@/app/layouts/AppLayout";
import NavBar from "@/components/NavBar";
import ComposePost from "@/components/compose-post";
import { redirect } from "next/navigation";
import { UserTypes } from "@/types/userTypes";
import ProfileFeed from "@/components/profileFeed";
import MobilePostButton from "@/components/MobilePostButton";

export const dynamic = "force-dynamic";

const getUserSession = async () => {
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

export default async function Index() {
    const sessionData = await getUserSession();
    if (sessionData === null) return null;

    const { session, userProfilePic, matchingUser } = sessionData;
    return (
        <>
            <NavBar />
            <AppLayout>
                <ComposePost profile_pic={userProfilePic} />
                <ProfileFeed type={"all"} />
                <MobilePostButton session={session} userProfilePic={userProfilePic} matchingUser={matchingUser}/>
            </AppLayout>
        </>
    );
}
