import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import LogoutButton from "../components/LogoutButton";
import DeployButton from "../components/DeployButton";
import ProfileFeed from "../components/profileFeed";
import { useRouter, redirect } from "next/navigation";
import ComposePost from "@/components/compose-post";
import AppLayout from "./layouts/page";
import FetchUsers from "@/utils/FetchUsers";

export const dynamic = "force-dynamic";

export default async function Index() {
    const supabase = createServerComponentClient({ cookies });
    const users = await FetchUsers();
    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (session === null) {
        redirect("/login");
    }

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const matchingUser = users?.find((user) => user.id === session.user.id);
    const userProfilePic = matchingUser?.profile_pic ?? null;

    return (
        <div className="w-full flex flex-col items-center">
            <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm text-foreground">
                    <DeployButton />
                    {user ? (
                        <div className="flex items-center gap-4">
                            {/* Hey, {user.email}! */}
                            Hey, {user.id}!
                            <LogoutButton />
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className="flex py-2 px-3 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </nav>
            <AppLayout>
                <ComposePost profile_pic={userProfilePic} />
                <ProfileFeed />
            </AppLayout>
        </div>
    );
}
