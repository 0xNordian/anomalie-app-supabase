import AnomalieLogo from "./AnomalieLogo";
import { UserTypes } from "@/types/userTypes";
import LogoutButton from "./LogoutButton";
import Link from "next/link";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import MobileMenu from "./MobileMenu";

async function FetchUserSession() {
    const supabase = createServerComponentClient({ cookies });
    const { data: users, error } = await supabase.from("users").select("*");
    const {
        data: { session },
    } = await supabase.auth.getSession();
    if (session === null) return;
    const matchingUser = users?.find(
        (user: UserTypes) => user.id === session.user.id
    );
    return matchingUser;
}

const NavBar = async () => {
    const supabase = createServerComponentClient({ cookies });
    const data = await FetchUserSession();
    // console.log("FetchUserSession: ", data)
    const {
        data: { user },
    } = await supabase.auth.getUser();
    console.log("NavBar: ", user);
    return (
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
            <div className="hidden w-full max-w-4xl lg:flex lg:justify-between lg:items-center p-3 text-sm text-foreground">
                <AnomalieLogo />
                {user ? (
                    <div className="flex items-center gap-4">
                        {/* Hey, {user.email}! */}
                        Hey, {data?.username}!
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
            <div className="w-full lg:hidden ">
                <MobileMenu session={data} user={user}/>
            </div>
        </nav>
    );
};

export default NavBar;
