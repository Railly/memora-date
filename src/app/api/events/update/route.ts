import { cookies } from "next/headers";
import ServerApiProvider from "@/services/server";
import { ApiResponse } from "../../utils/response.utils";

export async function PUT(req: Request) {
  try {
    const requestBody = await req.json();
    const serverApiProvider = new ServerApiProvider({ cookies });

    const response = await serverApiProvider.event.updateEvent(requestBody);
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
