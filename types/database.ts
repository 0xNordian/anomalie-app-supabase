export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          author_id: string
          content: string
          created_at: string
          post_id: string
        }
        Insert: {
          author_id: string
          content: string
          created_at?: string
          post_id?: string
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string
          post_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "posts_author_id_fkey"
            columns: ["author_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      reactions: {
        Row: {
          created_at: string
          emoji: string
          post_id: string
          react_giver_user_id: string
          react_recipient_user_id: string
          reaction_id: string
        }
        Insert: {
          created_at?: string
          emoji: string
          post_id: string
          react_giver_user_id: string
          react_recipient_user_id: string
          reaction_id?: string
        }
        Update: {
          created_at?: string
          emoji?: string
          post_id?: string
          react_giver_user_id?: string
          react_recipient_user_id?: string
          reaction_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reactions_post_id_fkey"
            columns: ["post_id"]
            referencedRelation: "posts"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "reactions_react_giver_user_id_fkey"
            columns: ["react_giver_user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reactions_react_recipient_user_id_fkey"
            columns: ["react_recipient_user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          created_at: string
          id: string
          profile_pic: string | null
          username: string | null
        }
        Insert: {
          created_at?: string
          id: string
          profile_pic?: string | null
          username?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          profile_pic?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
