// Corrected import statement
'use client'
import React, { useEffect, useState } from "react";

import supabase from "../utils/supabase";
import { UserTypes } from "../types/userTypes";

// Removed async from component definition
const InputUpdateUsername = ({session}: any) => {
    // console.log("session: ", session);
    const [username, setUsername] = useState<string>("");
    const [currentUsername, setCurrentUsername] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            const supabaseUsername = await NewFetchUsers();
            // Assuming session.user.id is synchronous and available immediately
            const sessionUsername = supabaseUsername?.filter(item => item.id === session.user.id);
            if (sessionUsername && sessionUsername.length > 0) {
                setCurrentUsername(sessionUsername[0].username);
            }
        };

        fetchUsers();
    }, [session]);

    // console.log("currentUsername: ", currentUsername);

    return (
        <input
            type="text"
            name="newUsername"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="New Username"
            className="text-black p-2 rounded-md"
        />
    );
};

export default InputUpdateUsername;

export async function NewFetchUsers() {
    const { data: users, error } = await supabase.from("users").select("*");
    return users as UserTypes[] | null;
}
