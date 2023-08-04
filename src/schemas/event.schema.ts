import * as zod from "zod";

export const eventSchema = zod.object({
  name: zod.string().min(3, { message: "Enter at least 3-character name." }),
  description: zod
    .string()
    .min(10, { message: "Add a 10-character description." }),
  date: zod.date({
    required_error: "Date required",
    invalid_type_error: "Invalid date",
  }),
  is_public: zod.boolean(),
});

export const eventTypeSchema = zod.object({
  type: zod.string().uuid({ message: "Event type required" }),
});
