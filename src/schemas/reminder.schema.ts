import * as zod from "zod";

export const TIME_UNIT_ARRAY = [
  "Minute",
  "Hour",
  "Day",
  "Week",
  "Month",
  "Year",
] as const;

const recurrenceDiscriminatedSchema = zod.discriminatedUnion("type", [
  zod.object({
    type: zod.literal("Until", {
      required_error: "Recurrence type required",
      invalid_type_error: "Invalid recurrence type",
    }),
    value: zod.date({
      invalid_type_error: "Invalid date",
      required_error: "Date required",
    }),
  }),
  zod.object({
    type: zod.literal("After", {
      required_error: "Recurrence type required",
      invalid_type_error: "Invalid recurrence type",
    }),
    value: zod
      .number({
        required_error: "Value required",
        invalid_type_error: "Invalid value",
        coerce: true,
      })
      .min(1, { message: "Enter at least 1." }),
  }),
]);

export const reminderSchema = zod.discriminatedUnion("isEnabled", [
  zod.object({
    isEnabled: zod.literal(true),
    date: zod.date({
      required_error: "Date required",
      invalid_type_error: "Invalid date",
    }),
    time: zod
      .string({
        required_error: "Time required",
        invalid_type_error: "Invalid time",
      })
      .regex(
        new RegExp(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/),
        "Invalid time"
      ),
    notification_methods: zod
      .array(
        zod.enum(["EMAIL", "SMS"], {
          invalid_type_error: "Invalid notification method",
          required_error: "Notification method required",
        }),
        {
          required_error: "Enable at least one method.",
        }
      )
      .min(1, { message: "Enable at least one method." }),
    _: zod.discriminatedUnion("reminder_type", [
      zod.object({
        reminder_type: zod.literal("ONE_TIME"),
      }),
      zod.object({
        reminder_type: zod.literal("RECURRING"),
        interval: zod.object({
          value: zod.number({
            coerce: true,
            required_error: "Interval value required",
            invalid_type_error: "Invalid interval value",
          }),
          unit: zod.enum(TIME_UNIT_ARRAY, {
            required_error: "Interval unit required",
          }),
        }),
        recurrence: recurrenceDiscriminatedSchema,
      }),
    ]),
  }),
  zod.object({
    isEnabled: zod.literal(false),
  }),
]);
