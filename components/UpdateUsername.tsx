"use client";

import supabase from "@/utils/supabase";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { UserTypes } from "@/types/userTypes";

type UpdateUsernameType = {
    userSession: {
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
};

const UpdateUsername = ({ userSession }: UpdateUsernameType) => {
    const [users, setUsers] = useState<UserTypes[]>([]);
    const [userSessionId, setUserSessionId] = useState<string>("");
    const [currentUsername, setCurrentUsername] = useState("");

    useEffect(() => {
        if (!userSession) {
            // Handle the case where userSession is null
            console.error('No user session provided');
            return;
        }

        // ... rest of your code
    }, [userSession]);

    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const { data: user, error } = await supabase
                    .from("users")
                    .select("*");
                    if (user === null) {
                        setUsers([]);  // Set to an empty array if user is null
                    } else {
                        setUsers(user as UserTypes[]);  // Assume user is an array of UserTypes
                    }
            } catch (error) {
                console.error("Error fetching username:", error);
            }
        };

        fetchUsername();

        try {
            setUserSessionId(userSession.id);
        } catch (error) {
            console.error("Error fetching session:", error);
            return () => {}; // Return an empty function for cleanup
        }
        return () => {
            // Cleanup code, if needed
        };
    }, []);

    useEffect(() => {
        // Filter the username when users or userSessionId changes
        const filteredUsername = users.find(
            (user) => user.id === userSessionId
        ) as { username: string } | undefined;
        console.log("filteredUsername id: ", filteredUsername);
        // Set the currentUsername state with the filtered username
        if (filteredUsername) {
            setCurrentUsername(filteredUsername.username);
        } else {
            setCurrentUsername(""); // Set it to an empty string if no matching user
        }
        // console.log("users: ", users);
        return () => {
            // Cleanup code, if needed
        };
    }, [users, userSessionId]);

    const handleUpdateUsername = async (formData: FormData) => {
        try {
            console.log("formData: ", formData);
            const newUsername = formData.get("newUsername");
            console.log("newUsername: ", newUsername);
            if (newUsername === null) return;
            // console.log("users: ", users)
            if (users) {
                const { data, error } = await supabase
                    .from("users")
                    .update({ username: newUsername })
                    .eq("id", userSession.id);
                console.log("Query obj: ", { username: newUsername });
                console.log("data: ", data);
            }
        } catch (error) {
            console.error("Error updating username:", error);
        }
    };

    //!    (id = auth.uid())

    return (
        <>
<form action={handleUpdateUsername}>
    <div className="flex justify-center items-center w-1/2 gap-2">
        <div className="flex flex-col">
            <label htmlFor="newUsername">Username</label>
            <input
                value={currentUsername}
                onChange={(e) => setCurrentUsername(e.target.value)}
                name="newUsername"
                id="newUsername"
                placeholder="New Username"
                className="text-black p-2 rounded-md"
            />
        </div>
        <Button type="submit" color="primary" className="w-1/4 self-end">
            Save
        </Button>
    </div>
</form>

        </>
    );
};

export default UpdateUsername;
