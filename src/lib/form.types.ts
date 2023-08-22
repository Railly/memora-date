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
  event: CreateEventSchema["event"];
  user_id: string;
  event_type_id: string;
  contact_id: string;
};

export type CreateReminderParams = {
  reminder: CreateEventSchema["reminder"];
  event_id: string;
};
