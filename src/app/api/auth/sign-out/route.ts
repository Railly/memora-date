import { cookies } from "next/headers";
import ServerApiProvider from "@/services/server";
import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "../../utils/response.utils";

export async function POST(req: NextRequest) {
  try {
    const serverApiProvider = new ServerApiProvider({ cookies });
    const response = await serverApiProvider.auth.signOut();
    console.log({ response });
    if (response?.error) {
      return ApiResponse.serverError(response.error.message, response.error);
    }
    const signInUrl = new URL("/sign-in", req.nextUrl.origin);
    const referer = req.headers.get("referer");
    if (referer) {
      const refererUrl = new URL(referer);
      signInUrl.searchParams.set("redirectTo", refererUrl.pathname);
    }
    return ApiResponse.success(
      {
        message: "You have been signed out successfully",
        redirectTo: signInUrl.pathname + signInUrl.search,
      },
      302
    );
  } catch (error) {
    return ApiResponse.serverError(
      "Something went wrong, please try again later",
      error
    );
  }
}
