import React from "react";
import { Button } from "@nextui-org/button";
import FetchReactions from "@/utils/FetchReactions";

const Settings = async () => {
    const reactions = await FetchReactions();
    console.log("reactions: ", reactions)
    return (
        <>
            <h1>Settings</h1>
            <p>These are your settings!</p>

            <div>
                <Button color="danger">Click me</Button>
            </div>
        </>
    );
};

export default Settings;