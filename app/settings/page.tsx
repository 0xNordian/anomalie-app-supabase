import React from "react";
import AppLayout from "@/app/layouts/AppLayout";
import NavBar from "@/components/NavBar";
import UpdateUsername from "@/components/UpdateUsername";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
const supabase = createServerComponentClient({ cookies });

export const dynamic = "force-dynamic";

const Settings = async () => {
    const {
        data: { user },
    } = await supabase.auth.getUser();
    
    if (user === null) {
        return <div>Error: Not logged in</div>;
    }

    const {
        data: { session },
    } = await supabase.auth.getSession();
    // console.log("session: ", session);

    // const { data, error } = await supabase
    // .from('users')
    // .update({ username: "diamondHands100" })
    // .eq("id", session.user.id)
    // .select();  

    const handleUpdateUsername = async (newUsername: string) => {
        'use server'
        try {
            const { data, error } = await supabase
                .from('users')
                .update({ username: newUsername })
                .eq("id", session.user.id)
                .select();

            if (error) {
                console.error("Error updating username:", error);
            } else {
                console.log("Updated username:", data);
            }
        } catch (error) {
            console.error("Error updating username:", error);
        }
    };

    const userSession = user as {
        id: string;
        aud: string;
        role: string | undefined;
        email: string;
        email_confirmed_at: string;
        app_metadata: {
            provider: string;
            providers: string[];
        };
        confirmation_sent_at: string;
        confirmed_at: string;
        created_at: string;
        identities: Array<any>; // You can provide a more specific type if needed
        last_sign_in_at: string;
        phone: string;
        updated_at: string;
        user_metadata: Record<string, any>;
    };

    return (
        <>
            <NavBar />
            <AppLayout>
                <div className="p-6">
                    <h1>Settings</h1>
                    <UpdateUsername userSession={userSession} handleUpdateUsername={handleUpdateUsername}/>
                </div>
            </AppLayout>
        </>
    );
};

export default Settings;
