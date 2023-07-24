import serverApiProvider from "@/services/api";
import { NextResponse } from "next/server";
import { CustomResponse } from "../../utils/response.utils";

export async function POST() {
  try {
    const response = await serverApiProvider.auth.signOut();
    if (response?.error) {
      return CustomResponse.serverError(response.error.message, response.error);
    }
    return NextResponse.redirect("/auth/sign-in");
  } catch (error) {
    return CustomResponse.serverError(
      "Something went wrong, please try again later",
      error
    );
  }
}
