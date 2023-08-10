"use client";

import { User } from "@supabase/supabase-js";
import { IconFileImport } from "@tabler/icons-react";
import { useCallback, useEffect, useState } from "react";

import { Contact } from "@/lib/entities.types";
import clientApiProvider from "@/services/client";
import { ContactInfo, ContactProperty } from "@/types/types";

interface IContactPickerProps {
  user: User;
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
        const contactResponse = await clientApiProvider.contact.createContact({
          contact: adaptContactInfo(filteredContact) as any,
          user_id: user.id,
        });
        if (!contactResponse.ok) {
          throw new Error("Error creating contact:", contactResponse.error);
        }
      }

      setCurrentContacts((currentContacts) => [
        ...(currentContacts ?? []),
        ...filteredContacts.map(adaptContactInfo),
      ]);
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
    <section className="w-full">
      {isContactsSupported && (
        <button
          onClick={handlePick}
          className="min-w-full h-24 bg-transparent border-2 border-dashed border-white  p-4 min-min-w-full flex justify-center items-center rounded-lg cursor-pointer"
        >
          <IconFileImport size={24} />
          <span className="text-2xl ml-1">Import from phone</span>
        </button>
      )}
    </section>
  );
};

export default ContactPicker;

const adaptContactInfo = (contactInfo: ContactInfo): Contact => {
  const contact: Contact = {
    address:
      contactInfo.address && contactInfo.address.length > 0
        ? contactInfo.address[0].toString()
        : null,
    created_at: null, // You may set this value if needed
    email:
      contactInfo.email && contactInfo.email.length > 0
        ? contactInfo.email[0]
        : null,
    full_name:
      contactInfo.name && contactInfo.name.length > 0
        ? contactInfo.name[0]
        : "",
    id: "",
    image_url:
      contactInfo.icon && contactInfo.icon.length > 0
        ? URL.createObjectURL(contactInfo.icon[0])
        : null,
    phone:
      contactInfo.tel && contactInfo.tel.length > 0 ? contactInfo.tel[0] : null,
    user_id: "",
    name_email_phone: "",
  };

  return contact;
};
