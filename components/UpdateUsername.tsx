"use client";

import supabase from "@/utils/supabase";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";

type UpdateUsernameType = {
    userSession: {
        id: string;
        aud: string;
        role: string;
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
    const [users, setUsers] = useState<any[]>([]);
    const [userSessionId, setUserSessionId] = useState<string>("");
    const [currentUsername, setCurrentUsername] = useState("");

    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const { data: user, error } = await supabase
                    .from("users")
                    .select("*");
                setUsers(user);
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
        return () => {
            // Cleanup code, if needed
        };
    }, [users, userSessionId]);

    const handleUpdateUsername = async (formData: FormData) => {
        try {
            const newUsername = formData.get("newUsername");
            if (newUsername === null) return;
            if (users) {
                const { data, error } = await supabase
                    .from("users")
                    .update({ username: newUsername })
                    .eq("id", userSession.id)
                    .select()
                    // .single();

                // if (data) {
                //     setUsername(newUsername);
                //     setNewUsername("");
                // }
            }
        } catch (error) {
            console.error("Error updating username:", error);
        }
    };

    return (
        <>
            <h2>Update Username</h2>

            <div className="flex flex-col w-1/4 gap-4">
                <form action={handleUpdateUsername}>
                    <input
                        value={currentUsername}
                        onChange={(e) => setCurrentUsername(e.target.value)}
                        name="newUsername"
                        placeholder="New Username"
                        className="text-black p-2 rounded-md"
                    />
                    <Button type="submit" color="primary" className="w-1/2">
                        Save
                    </Button>
                </form>
            </div>
        </>
    );
};

export default UpdateUsername;