import { CreateEventSchema } from "@/schemas/create-event.schema";
import { HttpError } from "../errors";
import { ClientServiceApi } from "./blueprint";
import { CreateReminderParams } from "@/lib/form.types";

class ClientReminderService extends ClientServiceApi {
  async createReminder({ reminder, event_id }: CreateReminderParams) {
    try {
      const response = await fetch("/api/reminders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reminder,
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
}

export default ClientReminderService;
