import { EventColumns } from "@/lib/entities.types";
import { CreateEventParams, UpdateEventParams } from "@/lib/form.types";
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
  }: CreateEventParams) {
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

  // Search for events by event name
  async searchEvents({
    searchTerm,
    column,
  }: {
    searchTerm: string;
    column: EventColumns;
  }) {
    try {
      const response = await fetch("/api/events/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          column,
          searchTerm,
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

  async deleteEvent({ event_id }: { event_id: string }) {
    try {
      const response = await fetch("/api/events/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event_id,
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

  async updateEvent({ event, contact_id, event_type_id }: UpdateEventParams) {
    try {
      const response = await fetch("/api/events/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event,
          contact_id,
          event_type_id,
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
