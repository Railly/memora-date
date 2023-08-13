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
          name_email_phone: string | null
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
          is_public: boolean
          name: string
          user_id: string
          title_description: string | null
        }
        Insert: {
          contact_id?: string | null
          created_at?: string | null
          date: string
          description?: string | null
          event_type_id: string
          id?: string
          is_public?: boolean
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
          is_public?: boolean
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
          day_of_week: string | null
          end_date: string | null
          event_id: string
          id: string
          interval: string | null
          last_sent: string | null
          notification_methods: string[]
          notify_before: string
          reminder_type: string
          sent_count: number | null
        }
        Insert: {
          created_at?: string | null
          day_of_week?: string | null
          end_date?: string | null
          event_id: string
          id?: string
          interval?: string | null
          last_sent?: string | null
          notification_methods: string[]
          notify_before: string
          reminder_type?: string
          sent_count?: number | null
        }
        Update: {
          created_at?: string | null
          day_of_week?: string | null
          end_date?: string | null
          event_id?: string
          id?: string
          interval?: string | null
          last_sent?: string | null
          notification_methods?: string[]
          notify_before?: string
          reminder_type?: string
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
      name_email_phone: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      title_description: {
        Args: {
          "": unknown
        }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
