import * as zod from "zod";

export const eventSchema = zod.object({
  name: zod.string().min(3, { message: "Add a 3-character name" }),
  description: zod
    .string()
    .min(10, { message: "Add a 10-character description." }),
  is_public: zod.boolean(),
});

export const eventTypeSchema = zod.object({
  type: zod.string().uuid({ message: "Event type required" }),
});
