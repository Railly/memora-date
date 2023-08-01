import * as zod from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/webp",
];

export const eventSchema = zod.object({
  name: zod
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
  description: zod
    .string()
    .min(10, { message: "Description must be at least 10 characters long" }),
  date: zod.string().min(10, { message: "Must select a date" }),
  is_public: zod.boolean(),
});

export const eventTypeSchema = zod.object({
  type: zod.string().uuid({ message: "Must select an event type" }),
});

export const reminderSchema = zod.object({
  is_email_enabled: zod.boolean(),
  is_sms_enabled: zod.boolean(),
  notify_before_number: zod.string().uuid({
    message: "Must select a number",
  }),
  notify_before_time_unit: zod.string().uuid({
    message: "Must select a time unit",
  }),
  reminder_type: zod.enum(["ONE_TIME", "RECURRING"]),
  interval: zod.enum(["DAILY", "WEEKLY", "MONTHLY", "ANNUALLY"]),
  end_date: zod.string().min(10, { message: "Must select a date" }),
  day_of_week: zod.enum(["0", "1", "2", "3", "4", "5", "6"]),
});

export const contactSchema = zod.object({
  contact: zod.string().uuid({ message: "Must select a contact" }),
  full_name: zod
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
  phone: zod
    .string()
    .min(9, { message: "Phone must be at least 9 characters long" }),
  email: zod.string().email({ message: "Must be a valid email" }),
  image: zod
    .any()
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max image size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

export const createEventSchema = zod.object({
  event: eventSchema,
  event_type: eventTypeSchema,
  reminder: reminderSchema,
  contact: contactSchema,
});

export type CreateEventSchema = zod.infer<typeof createEventSchema>;

export const defaultValues: CreateEventSchema = {
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
    is_email_enabled: false,
    is_sms_enabled: false,
    notify_before_number: "",
    notify_before_time_unit: "",
    reminder_type: "ONE_TIME",
    interval: "DAILY",
    end_date: "",
    day_of_week: "0",
  },
  contact: {
    contact: "",
    full_name: "",
    phone: "",
    email: "",
    image: undefined,
  },
};
