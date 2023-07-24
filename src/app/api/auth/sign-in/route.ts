import serverApiProvider from "@/services/api";
import { signInSchema } from "@/schemas/auth.schema";
import { CustomResponse } from "../../utils/response.utils";
import { validateBody } from "../../utils/validation.utils";

export async function POST(req: Request) {
  try {
    const body = validateBody(signInSchema, await req.json());
    if (body.error) {
      return CustomResponse.clientError("Invalid request body", body.error);
    }

    const response = await serverApiProvider.auth.signInWithEmailAndPassword(
      body.data
    );
    if (response.error) {
      return CustomResponse.serverError(response.error.message, response.error);
    }

    return CustomResponse.success({ data: response.data });
  } catch (error) {
    return CustomResponse.serverError(
      "Something went wrong, please try again later",
      error
    );
  }
}
