// Generated from the Supabase public schema.
// Regenerate with: npm run db:types --workspace web

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      driver_availability: {
        Row: {
          available_until: string | null;
          created_at: string;
          driver_user_id: string;
          id: string;
          is_available: boolean;
          last_location_at: string | null;
          latitude: number | null;
          longitude: number | null;
          radius_miles: number;
          updated_at: string;
        };
        Insert: {
          available_until?: string | null;
          created_at?: string;
          driver_user_id: string;
          id?: string;
          is_available?: boolean;
          last_location_at?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          radius_miles?: number;
          updated_at?: string;
        };
        Update: {
          available_until?: string | null;
          created_at?: string;
          driver_user_id?: string;
          id?: string;
          is_available?: boolean;
          last_location_at?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          radius_miles?: number;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

type PublicSchema = Database["public"];

export type Tables<TableName extends keyof PublicSchema["Tables"]> =
  PublicSchema["Tables"][TableName]["Row"];

export type TablesInsert<TableName extends keyof PublicSchema["Tables"]> =
  PublicSchema["Tables"][TableName]["Insert"];

export type TablesUpdate<TableName extends keyof PublicSchema["Tables"]> =
  PublicSchema["Tables"][TableName]["Update"];
