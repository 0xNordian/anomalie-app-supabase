import AnomalieLogo from "./AnomalieLogo";
import { supabase } from "@/utils/supabaseClient";
import LogoutButton from "./LogoutButton";
import Link from "next/link";
import { FetchUserSession, UserParamData } from "@/utils/FetchUsers";

const NavBar = async () => {
    const data = await FetchUserSession();
    console.log("FetchUserSession: ", data)
    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
            <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm text-foreground">
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
        </nav>
    );
};

export default NavBar;