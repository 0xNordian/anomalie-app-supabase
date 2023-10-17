import ProfileFeed from "../components/profileFeed";
import ComposePost from "@/components/compose-post";
import AppLayout from "./layouts/page";
import NavBar from "@/components/NavBar";
import { getUserSession } from "@/utils/userSessionUtils";

export const dynamic = "force-dynamic";

export default async function Index() {
    // const supabase = createServerComponentClient({ cookies });
    // const users = await FetchUsers();
    // const {
    //     data: { session },
    // } = await supabase.auth.getSession();

    // if (session === null) {
    //     redirect("/login");
    // }

    // const {
    //     data: { user },
    // } = await supabase.auth.getUser();
    // const matchingUser = users?.find((user) => user.id === session.user.id);
    // const userProfilePic = matchingUser?.profile_pic ?? null;
    const sessionData = await getUserSession(); 
    if (sessionData === null) return null;

    const { session, userProfilePic } = sessionData;
    return (
        <div className="w-full flex flex-col items-center">
            <NavBar />
            <AppLayout>
                <ComposePost profile_pic={userProfilePic} />
                <ProfileFeed type={"all"}/>
            </AppLayout>
        </div>
    );
}
