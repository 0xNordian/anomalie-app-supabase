import { supabase } from "../utils/supabaseClient";
import { UserTypes } from "../types/userTypes";
import { getUserSession } from "./userSessionUtils";

export default async function FetchUsers(): Promise<UserTypes[] | null> {
    const { data: users, error } = await supabase.from("users").select("*");
    return users as UserTypes[] | null;
}

export async function FetchUserSession() {
    const users = await FetchUsers();
    const {
        data: { session },
    } = await supabase.auth.getSession();
    if (session === null) return;
    const matchingUser = users?.find((user) => user.id === session.user.id);
    return matchingUser;
}

type UserParamDataType = {
    params: {
        author_id: string;
    };
};

export async function UserParamData({ params }: UserParamDataType) {
    const userSessionData = await FetchUserSession();
    const users = await FetchUsers();
    const sessionData = await getUserSession();
    if (sessionData === null) return null;
    const matchingUser = users?.find((user) => user.id === params.author_id);
    return matchingUser;
}
