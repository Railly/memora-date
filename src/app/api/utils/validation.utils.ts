import { z } from "zod";

export const VALIDATION_ERROR = "ValidationError";

type Success<T> = { data: T; error: null };
type Failure = {
  data: null;
  error: { name: string; message: string; status: number; errors: any };
};

type ValidationResult<T> = Success<T> | Failure;

export function validateBody<T>(
  schema: z.ZodSchema<T>,
  body: any
): ValidationResult<T> {
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    const { errors } = parsed.error;
    return {
      data: null,
      error: {
        name: VALIDATION_ERROR,
        message: "Invalid request body",
        status: 400,
        errors,
      },
    };
  }

  return {
    data: parsed.data,
    error: null,
  };
}
