export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string | null;
          full_name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      habits: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          streak_count: number;
          last_checked_in: string | null;
          created_at: string;
          updated_at: string;
          deleted: boolean;
          user_id: string;
          reminder_time: string | null;
          reminder_days: number[] | null;
          color: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          streak_count?: number;
          last_checked_in?: string | null;
          created_at?: string;
          updated_at?: string;
          deleted?: boolean;
          user_id: string;
          reminder_time?: string | null;
          reminder_days?: number[] | null;
          color?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          streak_count?: number;
          last_checked_in?: string | null;
          created_at?: string;
          updated_at?: string;
          deleted?: boolean;
          user_id?: string;
          reminder_time?: string | null;
          reminder_days?: number[] | null;
          color?: string;
        };
      };
      check_ins: {
        Row: {
          id: string;
          habit_id: string;
          checked_at: string;
          created_at: string;
          updated_at: string;
          deleted: boolean;
        };
        Insert: {
          id?: string;
          habit_id: string;
          checked_at?: string;
          created_at?: string;
          updated_at?: string;
          deleted?: boolean;
        };
        Update: {
          id?: string;
          habit_id?: string;
          checked_at?: string;
          created_at?: string;
          updated_at?: string;
          deleted?: boolean;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
