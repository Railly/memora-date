import { CreateEventSchema } from "@/schemas/create-event.schema";
import { REMINDER_ERROR } from "../constants";
import { ServerServiceApi } from "./blueprint";
import {
  HandleOneTimeReminderParams,
  HandleRecurringReminderParams,
  UpdateReminderParams,
} from "@/lib/form.types";
import { Client } from "@upstash/qstash";
import { generateCronExpression } from "@/lib/utils";

if (!process.env.QSTASH_TOKEN) {
  throw new Error("Missing QSTASH_TOKEN environment variable");
}

const qstash = new Client({
  token: process.env.QSTASH_TOKEN,
});

class ServerReminderService extends ServerServiceApi {
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

    if (params.reminder_id && !params.isEnabled) {
      this.deleteOneTimeReminderMessage({
        messageId: params.message_schedule_id,
      });
    }

    if (!params.reminder_id && params.isEnabled) {
      // TODO: Create a new message
    }

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

    if (params.reminder_id && !params.isEnabled) {
      this.deleteRecurrentReminderSchedule({
        scheduleId: params.message_schedule_id,
      });
    }

    if (!params.reminder_id && params.isEnabled) {
      // TODO: Create a new schedule
    }

    return await this.updateOrInsertReminder(payload, params.reminder_id);
  }

  async updateReminder({
    event_id,
    reminder,
    reminder_id,
    message_schedule_id,
  }: UpdateReminderParams) {
    if (!reminder.isEnabled) return { error: null, data: null };

    const assertedEndDate =
      typeof reminder.date === "string"
        ? reminder.date
        : reminder.date?.toISOString();
    const newParams = {
      ...reminder,
      message_schedule_id,
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

  async createReminder({
    event_id,
    reminder,
    event,
  }: {
    event_id: string;
    reminder: CreateEventSchema["reminder"] & {
      reminder_type: "ONE_TIME" | "RECURRING";
    };
    event: CreateEventSchema["event"];
  }) {
    if (!reminder.isEnabled) return { error: null, data: null };

    const assertedEndDate =
      typeof reminder.date === "string"
        ? reminder.date
        : reminder.date?.toISOString();
    const newParams = {
      ...reminder,
      event_id,
      assertedEndDate,
    };

    try {
      if (newParams._?.reminder_type === "ONE_TIME") {
        const { error, data } = await this.handleOneTimeReminder(
          newParams as HandleOneTimeReminderParams
        );

        if (!error) {
          this.sendOneTimeReminderMessage({
            reminder: {
              ...newParams,
              reminder_type: "ONE_TIME",
              id: data?.[0].id,
            },
            event,
          });

          return { error, data };
        }

        return { error, data };
      } else if (newParams._?.reminder_type === "RECURRING") {
        const { error, data } = await this.handleRecurringReminder(
          newParams as HandleRecurringReminderParams
        );

        if (!error) {
          this.sendRecurringReminderSchedule({
            reminder: {
              ...newParams,
              reminder_type: "RECURRING",
              id: data?.[0].id,
            },
            event,
          });

          return { error, data };
        }

        return { error, data };
      }
      return { error: null, data: null };
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

  async sendOneTimeReminderMessage({
    reminder,
    event,
  }: {
    reminder: CreateEventSchema["reminder"] & {
      reminder_type: "ONE_TIME";
      event_id: string;
      id?: string;
    };
    event: CreateEventSchema["event"];
  }) {
    if (!reminder.isEnabled || reminder._.reminder_type !== "ONE_TIME")
      return { error: null, data: null };
    const { notification_methods, time, date } = reminder;
    const notificationMethod =
      notification_methods.length >= 1 &&
      notification_methods[0].toLocaleLowerCase();
    if (!notificationMethod)
      return {
        data: null,
        error: {
          name: REMINDER_ERROR,
          message: "No notification method found",
          status: 500,
        },
      };

    const exactDateWithTime = new Date(date).setHours(
      Number(time.split(":")[0]),
      Number(time.split(":")[1])
    );

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/send/${notificationMethod}`;
    const { messageId } = await qstash.publishJSON({
      url,
      body: {
        reminder: {
          reminder_type: "ONE_TIME",
          time,
          date,
          notificationMethod,
        },
        event: {
          event_id: reminder.event_id,
          ...event,
        },
      },
      notBefore: Math.floor(new Date(exactDateWithTime).getTime() / 1000),
      topic: "reminder",
    });

    await this.supabase
      .from("reminder")
      .update({
        message_schedule_id: messageId,
      })
      .eq("id", reminder.id)
      .select();

    return {
      data: null,
      error: null,
      messageId,
    };
  }

  async sendRecurringReminderSchedule({
    reminder,
    event,
  }: {
    reminder: CreateEventSchema["reminder"] & {
      reminder_type: "RECURRING";
      event_id: string;
      id?: string;
    };
    event: CreateEventSchema["event"];
  }) {
    if (!reminder.isEnabled || reminder._.reminder_type !== "RECURRING")
      return { error: null, data: null };
    const { notification_methods, time, date, _ } = reminder;
    const notificationMethod =
      notification_methods.length >= 1 &&
      notification_methods[0].toLocaleLowerCase();
    if (!notificationMethod)
      return {
        data: null,
        error: {
          name: REMINDER_ERROR,
          message: "No notification method found",
          status: 500,
        },
      };

    const cronExpression = generateCronExpression(_.interval?.unit);

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/send/${notificationMethod}`;
    const callback = `${process.env.NEXT_PUBLIC_BASE_URL}/api/reminders/${reminder.id}`;
    const { scheduleId } = await qstash.publishJSON({
      url,
      callback,
      body: {
        reminder: {
          reminder_type: "RECURRING",
          time,
          date,
          notificationMethod,
        },
        event: {
          event_id: reminder.event_id,
          ...event,
        },
      },
      cron: cronExpression,
      topic: "reminder",
    });

    await this.supabase
      .from("reminder")
      .update({
        message_schedule_id: scheduleId,
      })
      .eq("id", reminder.id)
      .select();

    return {
      data: null,
      error: null,
      scheduleId,
    };
  }

  async deleteRecurrentReminderSchedule({
    scheduleId,
  }: {
    scheduleId?: string | null;
  }) {
    try {
      if (!scheduleId)
        return { error: { message: "No scheduleId found" }, data: null };
      await qstash.schedules.delete({
        id: scheduleId,
      });
      return {
        data: "Remove schedule action was requested",
        error: null,
      };
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

  async deleteOneTimeReminderMessage({
    messageId,
  }: {
    messageId?: string | null;
  }) {
    try {
      if (!messageId) return { error: "No messageId found", data: null };
      await qstash.messages.delete({
        id: messageId,
      });
      return {
        data: "Remove message action was requested",
        error: null,
      };
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

  async deleteReminder({ reminder_id }: { reminder_id: string }) {
    try {
      const { error, data } = await this.supabase
        .from("reminder")
        .delete()
        .eq("id", reminder_id)
        .select();

      if (data?.[0].message_schedule_id) {
        if (data?.[0].reminder_type === "ONE_TIME") {
          await this.deleteOneTimeReminderMessage({
            messageId: data?.[0].message_schedule_id,
          });
        }
        await this.deleteRecurrentReminderSchedule({
          scheduleId: data?.[0].message_schedule_id,
        });
      }

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
