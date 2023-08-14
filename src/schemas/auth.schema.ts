import * as zod from "zod";

export const signInSchema = zod.object({
  email: zod.string().email({
    message: "Please enter a valid email",
  }),
  password: zod
    .string()
    .min(10, { message: "Password must be at least 10 characters long" }),
});

export const signUpSchema = zod.object({
  full_name: zod
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
  email: zod.string().email({
    message: "Please enter a valid email",
  }),
  password: zod
    .string()
    .min(10, { message: "Password must be at least 10 characters long" }),
});

export type SignInSchema = zod.infer<typeof signInSchema>;
export type SignUpSchema = zod.infer<typeof signUpSchema>;
