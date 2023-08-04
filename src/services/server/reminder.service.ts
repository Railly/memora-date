import { CreateEventSchema } from "@/schemas/create-event.schema";
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
      const {
        interval,
        notification_methods,
        notify_before_number,
        notify_before_time_unit,
        day_of_week,
        end_date,
        reminder_type,
      } = reminder;
      const assertedEndDate =
        typeof end_date === "string" ? end_date : end_date?.toISOString();
      const { error, data } = await this.supabase.from("reminder").insert([
        {
          event_id,
          interval,
          notification_methods,
          day_of_week,
          reminder_type,
          end_date: assertedEndDate,
          notify_before: `${notify_before_number},${notify_before_time_unit}`,
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
