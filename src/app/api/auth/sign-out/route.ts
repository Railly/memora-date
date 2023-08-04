import { cookies } from "next/headers";
import ServerApiProvider from "@/services/server";
import { NextResponse } from "next/server";
import { ApiResponse } from "../../utils/response.utils";

export async function POST() {
  try {
    const serverApiProvider = new ServerApiProvider({ cookies });
    const response = await serverApiProvider.auth.signOut();
    console.log({ response });
    if (response?.error) {
      return ApiResponse.serverError(response.error.message, response.error);
    }
    return NextResponse.redirect("/sign-in");
  } catch (error) {
    return ApiResponse.serverError(
      "Something went wrong, please try again later",
      error
    );
  }
}
