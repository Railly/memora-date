import { cookies } from "next/headers";
import ServerApiProvider from "@/services/server";
import { signInSchema } from "@/schemas/auth.schema";
import { ApiResponse } from "../../../utils/response.utils";
import { validateBody } from "../../../utils/validation.utils";

export async function POST(req: Request) {
  try {
    const body = validateBody(signInSchema, await req.json());
    if (body.error) {
      return ApiResponse.clientError("Invalid request body", body.error);
    }

    const serverApiProvider = new ServerApiProvider({ cookies });
    const response = await serverApiProvider.auth.signInWithEmailAndPassword(
      body.data
    );
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
