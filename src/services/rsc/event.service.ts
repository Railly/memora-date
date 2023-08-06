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
          head: true,
        }
      )
      .order("date", { ascending: true });
    return events;
  }

  async getEventTypes() {
    const eventTypes = await this.supabase.from("event_type").select("*");
    return eventTypes;
  }
}

export default RscEventService;
