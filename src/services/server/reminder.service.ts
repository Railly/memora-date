import { CreateEventSchema } from "@/schemas/create-event.schema";
import { REMINDER_ERROR } from "../constants";
import { ServerServiceApi } from "./blueprint";
import {
  HandleOneTimeReminderParams,
  HandleRecurringReminderParams,
  UpdateReminderParams,
} from "@/lib/form.types";

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
  private async updateOrInsertReminder(
    payload: {
      notification_methods: string[];
      time: string;
      reminder_type: "ONE_TIME" | "RECURRING";
      date: string;
      interval_unit?: string;
      interval_value?: number;
      recurrence_type?: string;
      recurrence_value?: string;
      event_id: string;
    },
    reminder_id?: string
  ) {
    if (reminder_id) {
      const { error, data } = await this.supabase
        .from("reminder")
        .update({
          notification_methods: payload.notification_methods,
          time: payload.time,
          reminder_type: payload.reminder_type,
          date: payload.date,
          interval_unit: payload.interval_unit,
          interval_value: payload.interval_value,
          recurrence_type: payload.recurrence_type,
          recurrence_value: payload.recurrence_value,
        })
        .eq("id", reminder_id)
        .select();
      return { error, data };
    }
    const { error, data } = await this.supabase
      .from("reminder")
      .upsert(payload)
      .select();
    return { error, data };
  }

  private async handleOneTimeReminder(params: HandleOneTimeReminderParams) {
    const payload = {
      notification_methods: params.notification_methods,
      time: params.time,
      reminder_type: "ONE_TIME" as const,
      date: params.assertedEndDate,
      event_id: params.event_id,
    };

    return await this.updateOrInsertReminder(payload, params.reminder_id);
  }

  private async handleRecurringReminder(params: HandleRecurringReminderParams) {
    const payload = {
      notification_methods: params.notification_methods,
      time: params.time,
      reminder_type: "RECURRING" as const,
      date: params.assertedEndDate,
      interval_unit: params._.interval?.unit,
      interval_value: params._.interval?.value,
      recurrence_type: params._.recurrence?.type,
      recurrence_value: params._.recurrence?.value.toLocaleString(),
      event_id: params.event_id,
    };

    return await this.updateOrInsertReminder(payload, params.reminder_id);
  }

  async updateReminder({
    event_id,
    reminder,
    reminder_id,
  }: UpdateReminderParams) {
    if (!reminder.isEnabled) return { error: null, data: null };

    const assertedEndDate =
      typeof reminder.date === "string"
        ? reminder.date
        : reminder.date?.toISOString();
    const newParams = {
      ...reminder,
      event_id,
      assertedEndDate,
      reminder_id,
    };

    try {
      if (newParams._?.reminder_type === "ONE_TIME") {
        return await this.handleOneTimeReminder(
          newParams as HandleOneTimeReminderParams
        );
      } else if (newParams._?.reminder_type === "RECURRING") {
        return await this.handleRecurringReminder(
          newParams as HandleRecurringReminderParams
        );
      }
      return { error: null, data: null };
    } catch (error) {
      console.error(error);
      return {
        data: null,
        error: {
          name: "REMINDER_ERROR",
          message: "Something went wrong, please try again later",
          status: 500,
        },
      };
    }
  }
}

export default ServerReminderService;
