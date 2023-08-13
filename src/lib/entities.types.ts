import { Database } from "./database.types";

export type Event = Database["public"]["Tables"]["event"]["Row"];
export type Contact = Database["public"]["Tables"]["contact"]["Row"];
export type EventType = Database["public"]["Tables"]["event_type"]["Row"];
export type Reminder = Database["public"]["Tables"]["reminder"]["Row"];
export type EventColumns = keyof Event;
export type ContactColumns = keyof Contact;

export interface EventWithType extends Event {
  event_type: {
    value: EventType["value"];
  } | null;
}
