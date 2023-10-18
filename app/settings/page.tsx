import React from "react";
import { Button } from "@nextui-org/button";
import FetchReactions from "@/utils/FetchReactions";
import AppLayout from "../layouts/page";
import NavBar from "@/components/NavBar";
import UpdateUsername from "@/components/UpdateUsername";
import { supabase } from "@/utils/supabaseClient";

const Settings = async () => {
    const {
        data: { user },
    } = await supabase.auth.getUser();
    console.log("user: ", user);
    return (
        <>
            <NavBar />
            <AppLayout>
                <div className="p-6">
                    <h1>Settings</h1>
                    <UpdateUsername userSession={user} />
                </div>
            </AppLayout>
        </>
    );
};

export default Settings;
