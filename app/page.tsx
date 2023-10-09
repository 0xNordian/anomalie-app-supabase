import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import LogoutButton from "../components/LogoutButton";
import DeployButton from "../components/DeployButton";
import ProfileFeed from "../components/profileFeed";
import { useRouter, redirect } from "next/navigation";
import ComposePost from "@/components/compose-post";

export const dynamic = "force-dynamic";

export default async function Index() {
    const supabase = createServerComponentClient({ cookies });
    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (session === null) {
        redirect("/login");
    }

    const {
        data: { user },
    } = await supabase.auth.getUser();
// console.log("user: ", user)
    // revalidatePath("/");

    return (
        <div className="w-full flex flex-col items-center">
            <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm text-foreground">
                    <DeployButton />
                    {user ? (
                        <div className="flex items-center gap-4">
                            Hey, {user.email}!
                            <LogoutButton />
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </nav>

            <main className="flex flex-col min-h-screen min-w-[75%] justify-center items-center text-white ">
                <h2>Hello twitter! 👋</h2>
                <div className="">
                    <ComposePost
                        profile_pic={session.user?.user_metadata?.profile_pic}
                    />
                    <ProfileFeed />
                </div>
            </main>
        </div>
    );
}
