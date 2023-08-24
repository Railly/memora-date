import { cookies } from "next/headers";
import ServerApiProvider from "@/services/server";
import { ApiResponse } from "../../utils/response.utils";

export async function GET() {
  try {
    const serverApiProvider = new ServerApiProvider({ cookies });

    const response = await serverApiProvider.auth.refreshSession();
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
