import serverApiProvider from "@/services/api";
import { NextResponse } from "next/server";
import { ApiResponse } from "../../utils/response.utils";

export async function POST() {
  try {
    const response = await serverApiProvider.auth.signOut();
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
