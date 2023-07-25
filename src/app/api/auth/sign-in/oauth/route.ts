import serverApiProvider from "@/services/api";
import { CustomResponse } from "../../../utils/response.utils";

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

    const response = await serverApiProvider.auth.signInWithProvider(provider);
    return CustomResponse.success(response);
  } catch (error) {
    return CustomResponse.serverError(
      "Something went wrong, please try again later",
      error
    );
  }
}
