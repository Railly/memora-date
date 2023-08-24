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
         event_type (value)
      `,
        {
          count: "exact",
        }
      )
      .order("date", { ascending: true });
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
         event_type (value)
      `
      )
      .eq("id", id);
    return event;
  }
}

export default RscEventService;
