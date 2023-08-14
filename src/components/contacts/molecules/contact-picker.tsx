"use client";

import { User } from "@supabase/supabase-js";
import { IconFileImport } from "@tabler/icons-react";
import { useCallback, useEffect, useState } from "react";

import { Contact } from "@/lib/entities.types";
import { ContactSchema } from "@/schemas/contact.schema";
import clientApiProvider from "@/services/client";
import { ContactInfo, ContactProperty } from "@/types/types";

interface IContactPickerProps {
  user: User | null;
  currentContacts: Contact[] | null;
  setCurrentContacts: React.Dispatch<React.SetStateAction<Contact[] | null>>;
}

const ContactPicker: React.FC<IContactPickerProps> = ({
  currentContacts,
  setCurrentContacts,
  user,
}) => {
  const [isContactsSupported, setIsContactsSupported] = useState(false);

  const handlePick = useCallback(async () => {
    let contactResponse;
    try {
      const contacts = await navigator.contacts.select(
        [
          ContactProperty.name,
          ContactProperty.email,
          ContactProperty.tel,
          ContactProperty.icon,
        ],
        { multiple: true }
      );

      // Filter contacts that are already in the list
      const filteredContacts = contacts.filter(
        (contact) =>
          !currentContacts?.find(
            (currentContact) =>
              currentContact.email === contact.email?.[0] ||
              currentContact.phone === contact.tel?.[0]
          )
      );

      if (filteredContacts.length === 0) {
        return;
      }

      for (const filteredContact of filteredContacts) {
        contactResponse = await clientApiProvider.contact.createContact({
          contact: adaptContactInfoParam(filteredContact),
          user_id: user?.id ?? "",
        });
        if (!contactResponse.ok) {
          throw new Error("Error creating contact:", contactResponse.error);
        }
        const newContact: Contact = contactResponse.data;

        setCurrentContacts((currentContacts) => [
          ...(currentContacts ?? []),
          newContact,
        ]);
      }
    } catch (error) {
      console.error("Error selecting contact:", error);
    }
  }, [currentContacts]);

  useEffect(() => {
    try {
      if (window.navigator) {
        const isSupported =
          "contacts" in navigator && "ContactsManager" in window;
        setIsContactsSupported(isSupported);
      }
    } catch (error) {
      console.error(
        "Error al comprobar el soporte de la API de Contactos:",
        error
      );
    }
  }, []);

  return (
    <>
      {isContactsSupported && (
        <section className="w-full">
          <button
            onClick={handlePick}
            className="min-w-full h-24 bg-transparent border-2 border-dashed border-white  p-4 min-min-w-full flex justify-center items-center rounded-lg cursor-pointer"
          >
            <IconFileImport size={24} />
            <span className="text-2xl ml-1">Import from phone</span>
          </button>
        </section>
      )}
    </>
  );
};

export default ContactPicker;

const adaptContactInfoParam = (contactInfo: ContactInfo): ContactSchema => {
  const contact: ContactSchema = {
    full_name: contactInfo.name?.[0] ?? "",
    email: contactInfo.email?.[0] ?? "",
    phone: contactInfo.tel?.[0] ?? "",
    image: contactInfo.icon?.[0] ?? "",
  };
  return contact;
};
