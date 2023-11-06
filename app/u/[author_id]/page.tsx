import AppLayout from "@/app/layouts/AppLayout";
import NavBar from "@/components/NavBar";
import ProfileHeader from "@/components/ProfileHeader";
import ProfileFeed from "@/components/profileFeed";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers"; 
import { UserTypes } from "@/types/userTypes";
import { redirect } from "next/navigation";

type AuthorPageType = {
    params: {
        author_id: string;
    };
};

type UserParamDataType = {
    params: {
        author_id: string;
    };
};

async function UserParamData({ params }: UserParamDataType) {
const supabase = createServerComponentClient({ cookies });

    const userSessionData = await FetchUserSession();
    const { data: users, error } = await supabase.from("users").select("*");
    // console.log("users: ", users)
    const sessionData = await getUserSession();
    if (sessionData === null) return null;
    const matchingUser = users?.find((user: UserTypes) => user.id === params.author_id);
    return matchingUser; 
}

async function FetchUserSession() {
const supabase = createServerComponentClient({ cookies });

    const { data: users, error } = await supabase.from("users").select("*");
    const {
        data: { session },
    } = await supabase.auth.getSession();
    if (session === null) return;
    const matchingUser = users?.find((user: UserTypes) => user.id === session.user.id);
    return matchingUser;
    
}

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

    const matchingUser = users?.find((user: UserTypes) => user.id === session.user.id);
    const userProfilePic = matchingUser?.profile_pic ?? null;

    return {
        session,
        userProfilePic,
    };
};

const AuthorPage = async ({ params }: AuthorPageType) => {
    const userSessionData = await FetchUserSession();
    // const user = await FetchUsers();
    // console.log("params: ", params)
    const sessionData = await getUserSession();
    if (sessionData === null) return null;
    // console.log("sessionData", sessionData)
    const { userProfilePic } = sessionData;

    const matchingUser = await UserParamData({
        params: { author_id: params.author_id },
    });

    if (!userSessionData) {
        return null;
    }

    // Check for null or undefined matchingUser
    if (!matchingUser) {
        return null;
    }

    if (!userSessionData) {
        return null;
    }

    return (
        <div className="w-full h-full flex flex-col items-center">
            <NavBar />
            <AppLayout>
                <ProfileHeader
                    profile_pic={userProfilePic}
                    matchingUser={matchingUser}
                />
                <ProfileFeed type={"profile"} author_id={params.author_id} />
                <div className="h-screen"></div>
            </AppLayout>
        </div>
    );
};

export default AuthorPage;
