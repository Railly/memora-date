import { ContactSchema } from "@/schemas/contact.schema";
import { CreateEventSchema } from "@/schemas/create-event.schema";

export type CreateContactParams = {
  contact: ContactSchema;
  user_id: string;
};

export type UpdateContactParams = {
  contact: ContactSchema & {
    contact_id: string;
    oldPath?: string | null;
  };
  user_id: string;
};

export type DeleteContactParams = {
  contact_id: string;
  image_url: string | null;
};

export type CreateEventParams = {
  event: CreateEventSchema["event"] & {
    is_contact_enabled: boolean;
    is_reminder_enabled: boolean;
  };
  user_id: string;
  event_type_id: string;
  contact_id: string | null;
};

export type CreateReminderParams = {
  reminder: CreateEventSchema["reminder"];
  event_id: string;
};

export type UpdateReminderParams = {
  reminder: CreateEventSchema["reminder"];
  event_id: string;
  reminder_id: string | null;
};

export type UpdateEventParams = {
  event: CreateEventSchema["event"] & {
    event_id: string;
    is_contact_enabled: boolean;
    is_reminder_enabled: boolean;
  };
  event_type_id: string;
  contact_id: string | null;
};

interface BaseReminderParams {
  notification_methods: string[];
  time: string;
  assertedEndDate: string;
  event_id: string;
  reminder_id?: string;
}

export interface HandleOneTimeReminderParams extends BaseReminderParams {
  _: {
    reminder_type: "ONE_TIME";
  };
}

export interface HandleRecurringReminderParams extends BaseReminderParams {
  _: {
    reminder_type: "RECURRING";
    interval: {
      unit: string;
      value: number;
    };
    recurrence: {
      type: string;
      value: number;
    };
  };
}
