import * as zod from "zod";
import { eventSchema, eventTypeSchema } from "./event.schema";
import { reminderSchema } from "./reminder.schema";
import { contactSchema } from "./contact.schema";

export const createEventSchema = zod.object({
  event: eventSchema,
  event_type: eventTypeSchema,
  reminder: reminderSchema,
  contact: contactSchema,
});

export type CreateEventSchema = zod.infer<typeof createEventSchema>;

type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

export const defaultValues: RecursivePartial<CreateEventSchema> = {
  event: {
    name: "",
    description: "",
    date: "",
    is_public: false,
  },
  event_type: {
    type: "",
  },
  reminder: {
    notify_before_number: 0,
    notify_before_time_unit: undefined,
    reminder_type: "ONE_TIME",
    notification_methods: ["EMAIL"],
    interval: "DAILY",
    day_of_week: undefined,
    end_date: undefined,
  },
  contact: {
    selectedContact: "",
    full_name: "",
    phone: "",
    email: "",
    image: undefined,
  },
};
