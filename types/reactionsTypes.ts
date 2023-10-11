export type ReactionsType = {
    reactions: {
        Row: {
            created_at: string;
            emoji: string;
            post_id: string;
            react_giver_user_id: string;
            react_recipient_user_id: string;
            reaction_id: string;
        };
        Insert: {
            created_at?: string;
            emoji: string;
            post_id: string;
            react_giver_user_id: string;
            react_recipient_user_id: string;
            reaction_id?: string;
        };
        Update: {
            created_at?: string;
            emoji?: string;
            post_id?: string;
            react_giver_user_id?: string;
            react_recipient_user_id?: string;
            reaction_id?: string;
        };
        Relationships: [
            {
                foreignKeyName: "reactions_post_id_fkey";
                columns: ["post_id"];
                referencedRelation: "posts";
                referencedColumns: ["post_id"];
            },
            {
                foreignKeyName: "reactions_react_giver_user_id_fkey";
                columns: ["react_giver_user_id"];
                referencedRelation: "users";
                referencedColumns: ["id"];
            },
            {
                foreignKeyName: "reactions_react_recipient_user_id_fkey";
                columns: ["react_recipient_user_id"];
                referencedRelation: "users";
                referencedColumns: ["id"];
            },
        ];
    };
};
