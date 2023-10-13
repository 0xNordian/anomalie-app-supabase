import React from "react";
import { Button } from "@nextui-org/button";
import FetchReactions from "@/utils/FetchReactions";
import AppLayout from "../layouts/page";
import NavBar from "@/components/NavBar";
import UpdateUsername from "@/components/UpdateUsername";

const Settings = async () => {
    const reactions = await FetchReactions();
    // console.log("reactions: ", reactions)
    return (
        <>
        <NavBar />
        <AppLayout>
            <h1>Settings</h1>
            <p>These are your settings!</p>
            {/* <div>
                <Button color="danger">Click me</Button>
            </div> */}
            <UpdateUsername />
        </AppLayout>
        </>
    );
};

export default Settings;