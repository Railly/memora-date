import { RscServiceApi } from "./blueprint";

class RscEventService extends RscServiceApi {
  constructor({ cookies }: { cookies: any }) {
    super({ cookies });
  }

  async getEvents() {
    const events = await this.supabase
      .from("event")
      .select(
        `*,
         event_type (value),
         reminder (date, time, reminder_type, interval_unit, interval_value, recurrence_type, recurrence_value, created_at),
         reminders_with_overdue (is_overdue)
      `,
        {
          count: "exact",
        }
      )
      .order("is_overdue", {
        foreignTable: "reminders_with_overdue",
        nullsFirst: true,
      });
    return events;
  }

  async getEventTypes() {
    const eventTypes = await this.supabase.from("event_type").select("*");
    return eventTypes;
  }
}

export default RscEventService;
