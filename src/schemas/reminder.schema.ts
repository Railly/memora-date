import * as zod from "zod";

const TIME_INTERVAL_ARRAY = ["DAILY", "WEEKLY", "MONTHLY", "ANNUALLY"] as const;
const TIME_UNIT_ARRAY = [
  "MINUTES",
  "HOURS",
  "DAYS",
  "WEEKS",
  "MONTHS",
] as const;
const DAY_OF_WEEK_ARRAY = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
] as const;

const baseReminderFields = {
  // is_email_enabled: zod.boolean(),
  // is_sms_enabled: zod.boolean(),
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
  notify_before_number: zod
    .number({
      coerce: true,
    })
    .min(1, { message: "Enter at least 1." })
    .max(60, { message: "Enter at most 60." }),
  notify_before_time_unit: zod.enum(TIME_UNIT_ARRAY, {
    invalid_type_error: "Invalid time unit",
    required_error: "Time unit required",
  }),
  interval: zod.enum(TIME_INTERVAL_ARRAY),
  day_of_week: zod.enum(DAY_OF_WEEK_ARRAY).optional(),
  end_date: zod.date().optional(),
};

const reminderTypeDiscriminatedSchema = zod.discriminatedUnion(
  "reminder_type",
  [
    zod.object({
      ...baseReminderFields,
      reminder_type: zod.literal("ONE_TIME"),
      end_date: zod.date().optional(),
    }),
    zod.object({
      ...baseReminderFields,
      reminder_type: zod.literal("RECURRING"),
      end_date: zod.date({
        required_error: "End date required",
        invalid_type_error: "Invalid end date",
      }),
    }),
  ]
);

const dayOfWeekDiscriminatedSchema = zod.discriminatedUnion("interval", [
  zod.object({
    ...baseReminderFields,
    interval: zod.literal("WEEKLY"),
    day_of_week: zod.enum(DAY_OF_WEEK_ARRAY, {
      invalid_type_error: "Invalid day of week",
      required_error: "Day of week required",
    }),
  }),
  zod.object({
    ...baseReminderFields,
    interval: zod.literal("DAILY"),
    day_of_week: zod.enum(DAY_OF_WEEK_ARRAY).optional(),
  }),
  zod.object({
    ...baseReminderFields,
    interval: zod.literal("MONTHLY"),
    day_of_week: zod.enum(DAY_OF_WEEK_ARRAY).optional(),
  }),
  zod.object({
    ...baseReminderFields,
    interval: zod.literal("ANNUALLY"),
    day_of_week: zod.enum(DAY_OF_WEEK_ARRAY).optional(),
  }),
]);

export const reminderSchema = zod.union([
  reminderTypeDiscriminatedSchema,
  dayOfWeekDiscriminatedSchema,
]);
