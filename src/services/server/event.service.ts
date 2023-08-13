import { EventColumns } from "@/lib/entities.types";
import { CreateEventSchema } from "@/schemas/create-event.schema";
import { eventServiceError } from "../utils";
import { ServerServiceApi } from "./blueprint";
import { EventColumns } from "@/lib/entities.types";

class ServerEventService extends ServerServiceApi {
  async getEventTypes() {
    try {
      const { error, data } = await this.supabase
        .from("event_type")
        .select("*");

      return { error, data };
    } catch (error) {
      return eventServiceError(error);
    }
  }

  async createEvent({
    event,
    event_type_id,
    user_id,
    contact_id,
  }: {
    event: CreateEventSchema["event"];
    user_id: string;
    event_type_id: string;
    contact_id: string;
  }) {
    try {
      const { name, description, date, is_public } = event;
      const assertedDate = typeof date === "string" ? date : date.toISOString();
      const { error, data } = await this.supabase
        .from("event")
        .insert([
          {
            user_id,
            event_type_id,
            name,
            description,
            is_public,
            contact_id,
            date: assertedDate,
          },
        ])
        .select();

      return { error, data: data?.[0] };
    } catch (error) {
      return eventServiceError(error);
    }
  }

  async searchTermInColumn({
    column,
    searchTerm,
  }: {
    column: EventColumns;
    searchTerm: string;
  }) {
    try {
      const { data, error } = await this.supabase
        .from("event")
        .select(`*, event_type ( value )`)
        .textSearch(`${column}`, `${searchTerm}`)
        .order("date", { ascending: true });

      return { data, error };
    } catch (error) {
      return eventServiceError(error);
    }
  }

  async searchTermInColumn({
    column,
    searchTerm,
  }: {
    column: EventColumns;
    searchTerm: string;
  }) {
    try {
      const { data, error } = await this.supabase
        .from("event")
        .select(`*, event_type ( value )`)
        .textSearch(`${column}`, `${searchTerm}`)
        .order("date", { ascending: true });
      return { data, error };
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
