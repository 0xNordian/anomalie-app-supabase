import { supabase } from "../utils/supabaseClient";
import { UserTypes } from "../types/userTypes";

export default async function FetchUsers(): Promise<UserTypes[] | null> {
    const { data: users, error } = await supabase
    .from("users")
    .select('*')
    return users as UserTypes[] | null;
}