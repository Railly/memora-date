import { EVENT_TYPE_ERROR } from "../constants";
import { ServerServiceApi } from "./blueprint";

class ServerEventService extends ServerServiceApi {
  async getEventTypes() {
    try {
      const { error, data } = await this.supabase
        .from("event_type")
        .select("*");
      return { error, data };
    } catch (error) {
      console.error(error);
      return {
        data: null,
        error: {
          name: EVENT_TYPE_ERROR,
          message: "Something went wrong, please try again later",
          status: 500,
        },
      };
    }
  }
}

export default ServerEventService;
