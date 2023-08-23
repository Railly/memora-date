import {
  CreateEventSchema,
  RecursivePartial,
} from "@/schemas/create-event.schema";
import { REMINDER_ERROR } from "../constants";
import { ServerServiceApi } from "./blueprint";

class ServerReminderService extends ServerServiceApi {
  async createReminder({
    reminder,
    event_id,
  }: {
    reminder: CreateEventSchema["reminder"] & {
      reminder_type: "ONE_TIME" | "RECURRING";
    };
    event_id: string;
  }) {
    try {
      if (reminder.isEnabled !== true) return { error: null, data: null };
      const { notification_methods, date, time, _ } = reminder;
      const assertedEndDate =
        typeof date === "string" ? date : date?.toISOString();
      if (_?.reminder_type === "ONE_TIME") {
        const { error, data } = await this.supabase.from("reminder").insert([
          {
            event_id,
            notification_methods,
            time,
            reminder_type: "ONE_TIME",
            date: assertedEndDate,
          },
        ]);

        return { error, data };
      }
      const { interval, recurrence } = _;
      const { error, data } = await this.supabase.from("reminder").insert([
        {
          event_id,
          notification_methods,
          time,
          reminder_type: "RECURRING",
          date: assertedEndDate,
          interval_unit: interval?.unit,
          interval_value: interval?.value,
          recurrence_type: recurrence?.type,
          recurrence_value: recurrence?.value.toLocaleString(),
        },
      ]);

      return { error, data };
    } catch (error) {
      console.error(error);
      return {
        data: null,
        error: {
          name: REMINDER_ERROR,
          message: "Something went wrong, please try again later",
          status: 500,
        },
      };
    }
  }
}

export default ServerReminderService;
