import * as zod from "zod";

export const signInSchema = zod.object({
  email: zod.string().email({
    message: "Please enter a valid email",
  }),
  password: zod
    .string()
    .min(10, { message: "Password must be at least 10 characters long" }),
});

export type SignInSchema = zod.infer<typeof signInSchema>;
