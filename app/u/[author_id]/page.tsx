// app/u/[author_id]/page.tsx
import AppLayout from "@/app/layouts/AppLayout";
import NavBar from "@/components/NavBar";
import ProfileHeader from "@/components/ProfileHeader";
import ComposePost from "@/components/compose-post";
import ProfileFeed from "@/components/profileFeed";
import { getUserSession } from "@/utils/userSessionUtils";
import FetchUsers, { UserParamData } from "@/utils/FetchUsers";
import { FetchUserSession } from "@/utils/FetchUsers";

type AuthorPageType = {
    params: {
        author_id: string;
    };
};

const AuthorPage = async ({ params }: AuthorPageType) => {
    const userSessionData = await FetchUserSession();
    const user = await FetchUsers();
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
        <div className="w-full flex flex-col items-center">
            <NavBar />
            <AppLayout>
                <ProfileHeader
                    profile_pic={userProfilePic}
                    matchingUser={matchingUser}
                />
                <ProfileFeed type={"profile"} author_id={params.author_id} />
            </AppLayout>
        </div>
    );
};

export default AuthorPage;
