import { cookies } from "next/headers";
import ServerApiProvider from "@/services/server";
import { ApiResponse } from "../../utils/response.utils";

export async function POST(_: Request, { params }: { params: { id: string } }) {
  try {
    const serverApiProvider = new ServerApiProvider({ cookies });

    const rawReminder = await serverApiProvider.reminder.getReminder({
      reminder_id: params.id,
    });

    const currentReminder = rawReminder.data?.[0];

    if (!currentReminder) {
      return ApiResponse.serverError("Reminder not found", rawReminder.error);
    }

    if (currentReminder.recurrence_type === "After") {
      if (
        Number(currentReminder?.sent_count) >=
        Number(currentReminder?.recurrence_value)
      ) {
        const response =
          await serverApiProvider.reminder.deleteRecurrentReminderSchedule({
            scheduleId: params.id,
          });

        if (response.error) {
          return ApiResponse.serverError(
            response.error.message,
            response.error
          );
        }
        return ApiResponse.success(response.data);
      }
    }

    if (currentReminder.recurrence_type === "Until") {
      if (!currentReminder?.recurrence_value) {
        return ApiResponse.serverError(
          "Something went wrong, please try again later",
          rawReminder.error
        );
      }
      if (
        new Date(currentReminder?.recurrence_value).getTime() <=
        new Date().getTime()
      ) {
        const response =
          await serverApiProvider.reminder.deleteRecurrentReminderSchedule({
            scheduleId: params.id,
          });

        if (response.error) {
          return ApiResponse.serverError(
            response.error.message,
            response.error
          );
        }
        return ApiResponse.success(response.data);
      }
    }
  } catch (error) {
    return ApiResponse.serverError(
      "Something went wrong, please try again later",
      error
    );
  }
}
