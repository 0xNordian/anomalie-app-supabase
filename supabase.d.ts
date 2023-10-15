declare module "@supabase/supabase-js" {
    interface SupabaseAuthClient {
        user(): User | null;
    }
}
