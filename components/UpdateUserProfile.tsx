"use client";

import supabase from "@/utils/supabase";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { UserTypes } from "@/types/userTypes";
import { FormEvent } from "react";
import { UserSessionType } from "@/types/UserSession";

// type UpdateFullNameType = {
//     handleUpdateFullName: (newFullName: string) => void;
//     userSession: UserSessionType
// };

type UpdateFullNameType = {
    handleUpdateProfile: (newUsername: string, newFullName: string) => void;
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

const UpdateUserProfile = ({
    userSession,
    handleUpdateProfile,
}: UpdateFullNameType) => {
    const [users, setUsers] = useState<UserTypes[]>([]);
    const [userSessionId, setUserSessionId] = useState<string>("");
    const [currentUsername, setCurrentUsername] = useState("");
    const [currentFullName, setCurrentFullName] = useState("");

    useEffect(() => {
        if (!userSession) {
            // Handle the case where userSession is null
            console.error("No user session provided");
            return;
        }

        // ... rest of your code
    }, [userSession]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const { data: user, error } = await supabase
                    .from("users")
                    .select("*");
                if (user === null) {
                    setUsers([]); // Set to an empty array if user is null
                } else {
                    setUsers(user as UserTypes[]); // Assume user is an array of UserTypes
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchUserData();

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

    // useEffect(() => {
    //     // Filter the username when users or userSessionId changes
    //     const filteredFullName = users.find(
    //         (user) => user.id === userSessionId
    //     ) as { full_name: string } | undefined;

    //     // Set the currentUsername state with the filtered username
    //     if (filteredFullName) {
    //         setCurrentFullName(filteredFullName?.full_name);
    //     } else {
    //         setCurrentFullName(""); // Set it to an empty string if no matching user
    //     }
    //     // console.log("users: ", users);
    //     return () => {
    //         // Cleanup code, if needed
    //     };
    // }, [users, userSessionId]);

    useEffect(() => {
        // Look up the user once when users or userSessionId changes
        const filteredUser = users.find((user) => user.id === userSessionId) as
            | { username: string; full_name: string }
            | undefined;

        console.log("filteredUser id: ", filteredUser);

        // Set the currentUsername and currentFullName state with the filtered data
        if (filteredUser) {
            setCurrentUsername(filteredUser.username);
            setCurrentFullName(filteredUser.full_name);
        } else {
            // Set both to an empty string if no matching user
            setCurrentUsername("");
            setCurrentFullName("");
        }

        // console.log("users: ", users);
        return () => {
            // Cleanup code, if needed
        };
    }, [users, userSessionId]);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleUpdateProfile(currentUsername, currentFullName);
    };

    //!    (id = auth.uid())

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col justify-center items-center w-1/2 gap-2">
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
                    <div className="flex flex-col">
                        <label htmlFor="newUsername">Full Name</label>
                        <input
                            value={currentFullName}
                            onChange={(e) => setCurrentFullName(e.target.value)}
                            name="newUsername"
                            id="newUsername"
                            placeholder="New Username"
                            className="text-black p-2 rounded-md"
                        />
                    </div>
                    <Button
                        type="submit"
                        color="primary"
                        className="w-1/4"
                    >
                        Save
                    </Button>
                </div>
            </form>
        </>
    );
};

export default UpdateUserProfile;
