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
        console.log("user: ", user)
    return (
        <>
        <NavBar />
        <AppLayout>
            <h1>Settings</h1>
            <p>These are your settings!</p>
            {/* <div>
                <Button color="danger">Click me</Button>
            </div> */}
            <UpdateUsername userSession={user}/>
        </AppLayout>
        </>
    );
};

export default Settings;