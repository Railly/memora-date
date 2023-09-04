import { Contact } from "@/lib/entities.types";
import { ContactSchema } from "@/schemas/contact.schema";

interface ParseContactBeforeCreate {
  allContacts?: Contact[] | null;
  contact?: ContactSchema;
}

const EMPTY_CONTACT_SCHEMA: ContactSchema = {
  full_name: "",
  email: "",
  image: null,
  phone: "",
  selectedContact: "",
  isImported: false,
};

export const parseContactBeforeCreate = ({
  allContacts,
  contact,
}: ParseContactBeforeCreate) => {
  if (!contact)
    return {
      data: EMPTY_CONTACT_SCHEMA,
      alreadyExists: false,
    };
  const { email, phone, ...rest } = contact;
  // use this object to avoid sending empty strings to the database (because default values are empty strings)
  const formattedData = {
    email: email || undefined,
    phone: phone || undefined,
    ...rest,
  };
  // Validate if contact already exists with the same email or phone
  const matchingContact = allContacts?.find(
    (contact) =>
      contact.email === formattedData.email ||
      contact.phone === formattedData.phone
  );
  return {
    data: formattedData,
    alreadyExists: !!matchingContact,
  };
};

interface ParseContactBeforeUpdateParams {
  allContacts: Contact[] | null;
  contact: ContactSchema;
  contact_id: string;
}

export const parseContactBeforeUpdate = ({
  contact_id,
  contact,
  allContacts,
}: ParseContactBeforeUpdateParams) => {
  const { email, phone, ...rest } = contact;
  const formattedData = {
    email: email || undefined,
    phone: phone || undefined,
    ...rest,
  };
  const oldPath =
    allContacts?.find(
      (contact) => contact.id === contact_id && contact.image_url !== null
    )?.image_url ?? null;

  return {
    contact_id,
    oldPath,
    ...formattedData,
  };
};
