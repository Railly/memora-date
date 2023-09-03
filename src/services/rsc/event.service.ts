import { RscServiceApi } from "./blueprint";

class RscEventService extends RscServiceApi {
  constructor({ cookies }: { cookies: any }) {
    super({ cookies });
  }

  async getEvents() {
    const events = await this.supabase.from("event").select(
      `*,
         event_type (value),
         contact (id, full_name),
         reminder (id, date, time, reminder_type, interval_unit, interval_value, recurrence_type, recurrence_value, created_at, notification_methods)
      `,
      {
        count: "exact",
      }
    );
    return events;
  }

  async getEventTypes() {
    const eventTypes = await this.supabase.from("event_type").select("*");
    return eventTypes;
  }

  async getEventById(id: string) {
    const event = await this.supabase
      .from("event")
      .select(
        `*,
         event_type (value),
         contact (id, full_name),
         reminder (id, date, time, reminder_type, interval_unit, interval_value, recurrence_type, recurrence_value, created_at, notification_methods)
      `
      )
      .eq("id", id);
    return event;
  }
}

export default RscEventService;
