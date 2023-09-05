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
      contact: {
        Row: {
          address: string | null;
          created_at: string | null;
          email: string | null;
          full_name: string;
          id: string;
          image_url: string | null;
          is_imported: boolean;
          phone: string | null;
          user_id: string;
          name_email_phone: string | null;
        };
        Insert: {
          address?: string | null;
          created_at?: string | null;
          email?: string | null;
          full_name: string;
          id?: string;
          image_url?: string | null;
          is_imported?: boolean;
          phone?: string | null;
          user_id: string;
        };
        Update: {
          address?: string | null;
          created_at?: string | null;
          email?: string | null;
          full_name?: string;
          id?: string;
          image_url?: string | null;
          is_imported?: boolean;
          phone?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "contact_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      event: {
        Row: {
          contact_id: string | null;
          created_at: string | null;
          description: string | null;
          event_type_id: string;
          id: string;
          is_contact_enabled: boolean;
          is_public: boolean;
          is_reminder_enabled: boolean;
          name: string;
          user_id: string;
          title_description: string | null;
        };
        Insert: {
          contact_id?: string | null;
          created_at?: string | null;
          description?: string | null;
          event_type_id: string;
          id?: string;
          is_contact_enabled?: boolean;
          is_public?: boolean;
          is_reminder_enabled?: boolean;
          name: string;
          user_id: string;
        };
        Update: {
          contact_id?: string | null;
          created_at?: string | null;
          description?: string | null;
          event_type_id?: string;
          id?: string;
          is_contact_enabled?: boolean;
          is_public?: boolean;
          is_reminder_enabled?: boolean;
          name?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "event_contact_id_fkey";
            columns: ["contact_id"];
            referencedRelation: "contact";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "event_event_type_id_fkey";
            columns: ["event_type_id"];
            referencedRelation: "event_type";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "event_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      event_type: {
        Row: {
          created_at: string | null;
          id: string;
          value: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          value?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          value?: string | null;
        };
        Relationships: [];
      };
      reminder: {
        Row: {
          created_at: string | null;
          date: string | null; // YYYY-MM-DD
          event_id: string;
          id: string;
          interval_unit: string | null; // "Minute", "Hour", "Day", "Week", "Month", "Year"
          interval_value: number | null; // Any number
          last_sent: string | null;
          message_schedule_id: string | null;
          notification_methods: string[]; // ["EMAIL", "SMS"]
          recurrence_type: string | null; // "After", "Until"
          recurrence_value: string | null; // Any number or "YYYY-MM-DDTHH:MM:SS.SSSZ"
          reminder_type: string; // "ONE_TIME" | "RECURRING"
          sent_count: number | null;
          time: string | null; // HH:MM
        };
        Insert: {
          created_at?: string | null;
          date?: string | null;
          event_id: string;
          id?: string;
          interval_unit?: string | null;
          interval_value?: number | null;
          last_sent?: string | null;
          message_schedule_id?: string | null;
          notification_methods: string[];
          recurrence_type?: string | null;
          recurrence_value?: string | null;
          reminder_type?: string;
          sent_count?: number | null;
          time?: string | null;
        };
        Update: {
          created_at?: string | null;
          date?: string | null;
          event_id?: string;
          id?: string;
          interval_unit?: string | null;
          interval_value?: number | null;
          last_sent?: string | null;
          message_schedule_id?: string | null;
          notification_methods?: string[];
          recurrence_type?: string | null;
          recurrence_value?: string | null;
          reminder_type?: string;
          sent_count?: number | null;
          time?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "reminder_event_id_fkey";
            columns: ["event_id"];
            referencedRelation: "event";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      name_email_phone: {
        Args: {
          "": unknown;
        };
        Returns: string;
      };
      title_description: {
        Args: {
          "": unknown;
        };
        Returns: string;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
