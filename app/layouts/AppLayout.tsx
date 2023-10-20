import { ReactNode } from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import LeftSideBar from "@/components/LeftSideBar";
import RightSideBar from "@/components/RightSideBar";
import { UserTypes } from "@/types/userTypes";

export const dynamic = "force-dynamic";

export default async function AppLayout({ children }: { children: ReactNode }) {
    const supabase = createServerComponentClient({ cookies });
    if (!supabase) return null;
    const { data: userData, error: userError } = await supabase.auth.getUser();
    const { data: users, error } = await supabase.from("users").select("*");
    const {
        data: { session },
    } = await supabase.auth.getSession();
    if (session === null) return;
    const matchingUser = users?.find((user: UserTypes) => user.id === session.user.id);
    const userProfilePic = matchingUser?.profile_pic ?? null;

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="max-w-screen-log w-full h-full flex relative">
                {/* //? LEFT SIDEBAR */}
                <LeftSideBar session={session} userProfilePic={userProfilePic} matchingUser={matchingUser}/>

                {/* //? CONTENT */}
                <div className="min-w-[800px] w-1/2 bg-anomalie-dark-blue">{children}</div>

                {/* //? RIGHT SIDEBAR */}
                <RightSideBar  />
            </div>
        </div>
    );
}