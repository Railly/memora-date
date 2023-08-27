import { Database } from "./database.types";

export type Event = Database["public"]["Tables"]["event"]["Row"];
// export type RemindersWithOverdue =
//   Database["public"]["Views"]["remi"]["Row"];
export type Contact = Database["public"]["Tables"]["contact"]["Row"];
export type EventType = Database["public"]["Tables"]["event_type"]["Row"];
export type Reminder = Database["public"]["Tables"]["reminder"]["Row"];
export type EventColumns = keyof Event;
export type ContactColumns = keyof Contact;

export interface EventWithType extends Event {
  event_type: {
    value: EventType["value"];
  } | null;
  contact: {
    id: Contact["id"];
    full_name: Contact["full_name"];
  } | null;
  reminder: Array<{
    id: Reminder["id"];
    date: Reminder["date"];
    time: Reminder["time"];
    reminder_type: Reminder["reminder_type"];
    interval_unit: Reminder["interval_unit"];
    interval_value: Reminder["interval_value"];
    recurrence_type: Reminder["recurrence_type"];
    recurrence_value: Reminder["recurrence_value"];
    created_at: Reminder["created_at"];
    notification_methods: Reminder["notification_methods"];
  }> | null;
  // reminders_with_overdue: Array<{
  //   is_overdue: RemindersWithOverdue["is_overdue"];
  // }> | null;
}
