import * as zod from "zod";
import { reminderSchema } from "./reminder.schema";
import { contactSettingsSchema } from "./contact.schema";
import { eventSchema, eventTypeSchema } from "./event.schema";

export const createEventSchema = zod.object({
  event: eventSchema,
  event_type: eventTypeSchema,
  reminder: reminderSchema,
  contact: contactSettingsSchema,
});

export type CreateEventSchema = zod.infer<typeof createEventSchema>;

export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

export const defaultValues: RecursivePartial<CreateEventSchema> = {
  event: {
    name: "",
    description: "",
    is_public: false,
  },
  event_type: {
    type: "",
  },
  reminder: {
    isEnabled: false,
  },
  contact: {
    isEnabled: false,
  },
};
