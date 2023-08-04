import { CreateEventSchema } from "@/schemas/create-event.schema";
import { HttpError } from "../errors";
import { ClientServiceApi } from "./blueprint";

class ClientEventService extends ClientServiceApi {
  async getEventTypes() {
    try {
      const response = await fetch("/api/events/types", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new HttpError(response.status, response.statusText);
      }
      return response.json();
    } catch (error) {
      if (error instanceof HttpError) {
        console.error(`HTTP Error: ${error.status} - ${error.statusText}`);
      } else {
        console.error(error);
      }
      throw error;
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
      const response = await fetch("/api/events/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event,
          event_type_id,
          user_id,
          contact_id,
        }),
      });
      if (!response.ok) {
        throw new HttpError(response.status, response.statusText);
      }
      return response.json();
    } catch (error) {
      if (error instanceof HttpError) {
        console.error(`HTTP Error: ${error.status} - ${error.statusText}`);
      } else {
        console.error(error);
      }
      throw error;
    }
  }
}

export default ClientEventService;
