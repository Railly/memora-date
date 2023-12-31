import { EventColumns } from "@/lib/entities.types";
import { CreateEventSchema } from "@/schemas/create-event.schema";
import { eventServiceError } from "../utils";
import { ServerServiceApi } from "./blueprint";

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
    event: CreateEventSchema["event"] & {
      is_contact_enabled: boolean;
      is_reminder_enabled: boolean;
    };
    user_id: string;
    event_type_id: string;
    contact_id: string;
  }) {
    try {
      const {
        name,
        description,
        is_public,
        is_contact_enabled,
        is_reminder_enabled,
      } = event;
      const fieldsToInsert = [
        {
          user_id,
          event_type_id,
          name,
          description,
          is_public,
          is_contact_enabled,
          is_reminder_enabled,
        },
      ];
      const { error, data } = await this.supabase
        .from("event")
        .insert(
          contact_id
            ? fieldsToInsert.map((field) => ({ ...field, contact_id }))
            : fieldsToInsert
        )
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
        .textSearch(`${column}`, `${searchTerm}`);

      return { data, error };
    } catch (error) {
      return eventServiceError(error);
    }
  }

  async deleteEvent({ event_id }: { event_id: string }) {
    try {
      const { data, error } = await this.supabase
        .from("event")
        .delete()
        .eq("id", event_id)
        .select();

      return { data, error };
    } catch (error) {
      return eventServiceError(error);
    }
  }

  async updateEvent({
    event,
    event_type_id,
    contact_id,
  }: {
    event: CreateEventSchema["event"] & {
      event_id: string;
      is_contact_enabled: boolean;
      is_reminder_enabled: boolean;
    };
    event_type_id: string;
    contact_id: string | null;
  }) {
    try {
      const {
        event_id,
        name,
        description,
        is_public,
        is_contact_enabled,
        is_reminder_enabled,
      } = event;
      const { data, error } = await this.supabase
        .from("event")
        .update({
          name,
          description,
          is_public,
          event_type_id,
          contact_id,
          is_contact_enabled,
          is_reminder_enabled,
        })
        .eq("id", event_id)
        .select();

      return { data, error };
    } catch (error) {
      return eventServiceError(error);
    }
  }
}

export default ServerEventService;
