import { supabase } from "../utils/supabaseClient";
import { ReactionsType } from "@/types/reactionsTypes";

export default async function FetchReactions(): Promise<
    ReactionsType[] | null
> {
    const { data: reactions, error } = await supabase
        .from("reactions")
        .select("*");
    return reactions as ReactionsType[] | null;
    
    if (error) {
        console.error("Error fetching reactions:", error);
        return null; // Handle the error as needed
    }
}

