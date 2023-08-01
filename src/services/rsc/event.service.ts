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
      event_type (
        value
      )`
      )
      .order("date", { ascending: true });
    return events;
  }
}

export default RscEventService;
