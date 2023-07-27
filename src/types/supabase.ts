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
      contact: {
        Row: {
          address: string | null
          created_at: string | null
          email: string | null
          full_name: string
          id: string
          image_url: string | null
          phone: string | null
          user_id: string
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          email?: string | null
          full_name: string
          id?: string
          image_url?: string | null
          phone?: string | null
          user_id: string
        }
        Update: {
          address?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string
          id?: string
          image_url?: string | null
          phone?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "contact_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      event: {
        Row: {
          contact_id: string | null
          created_at: string | null
          date: string
          description: string | null
          event_type_id: string
          id: string
          name: string
          user_id: string
        }
        Insert: {
          contact_id?: string | null
          created_at?: string | null
          date: string
          description?: string | null
          event_type_id: string
          id?: string
          name: string
          user_id: string
        }
        Update: {
          contact_id?: string | null
          created_at?: string | null
          date?: string
          description?: string | null
          event_type_id?: string
          id?: string
          name?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_contact_id_fkey"
            columns: ["contact_id"]
            referencedRelation: "contact"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_event_type_id_fkey"
            columns: ["event_type_id"]
            referencedRelation: "event_type"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      event_type: {
        Row: {
          created_at: string | null
          id: string
          value: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          value?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          value?: string | null
        }
        Relationships: []
      }
      reminder: {
        Row: {
          created_at: string | null
          event_id: string
          frequency: string
          id: string
          last_sent: string | null
          notification_methods: string[]
          notify_me: string
          sent_count: number | null
        }
        Insert: {
          created_at?: string | null
          event_id: string
          frequency: string
          id?: string
          last_sent?: string | null
          notification_methods: string[]
          notify_me: string
          sent_count?: number | null
        }
        Update: {
          created_at?: string | null
          event_id?: string
          frequency?: string
          id?: string
          last_sent?: string | null
          notification_methods?: string[]
          notify_me?: string
          sent_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "reminder_event_id_fkey"
            columns: ["event_id"]
            referencedRelation: "event"
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
