import { cookies } from "next/headers";
import ServerApiProvider from "@/services/server";
import { ApiResponse } from "../../../utils/response.utils";

export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const provider = searchParams.get("provider");
    if (!provider) {
      throw new Error("Provider should be specified");
    }
    if (provider !== "google" && provider !== "github") {
      throw new Error("Unsupported provider");
    }

    const serverApiProvider = new ServerApiProvider({ cookies });
    const response = await serverApiProvider.auth.signInWithProvider(provider);
    return ApiResponse.success(response.data);
  } catch (error) {
    return ApiResponse.serverError(
      "Something went wrong, please try again later",
      error
    );
  }
}
