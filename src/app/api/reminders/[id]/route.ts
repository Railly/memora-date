import { cookies } from "next/headers";
import ServerApiProvider from "@/services/server";
import { ApiResponse } from "../../utils/response.utils";

export async function POST(_: Request, { params }: { params: { id: string } }) {
  try {
    const serverApiProvider = new ServerApiProvider({ cookies });

    const response =
      await serverApiProvider.reminder.deleteRecurrentReminderSchedule({
        scheduleId: params.id,
      });

    if (response.error) {
      return ApiResponse.serverError(response.error.message, response.error);
    }
    return ApiResponse.success(response.data);
  } catch (error) {
    return ApiResponse.serverError(
      "Something went wrong, please try again later",
      error
    );
  }
}
