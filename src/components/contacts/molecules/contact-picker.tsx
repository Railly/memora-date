"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { IconFileImport } from "@tabler/icons-react";

import { Contact } from "@/lib/entities.types";
import { ContactSchema } from "@/schemas/contact.schema";
import clientApiProvider from "@/services/client";
import { ContactInfo, ContactProperty } from "@/types/types";
import { useToast } from "@/components/ui/use-toast";

interface IContactPickerProps {
  user: User | null;
  currentContacts: Contact[] | null;
}

const ContactPicker: React.FC<IContactPickerProps> = ({
  currentContacts,
  user,
}) => {
  const [isContactsSupported, setIsContactsSupported] = useState(false);

  const router = useRouter();

  const { toast } = useToast();

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

      if (contacts.length === 0) {
        return;
      }

      // Get existing emails and phones
      const existingEmails =
        currentContacts?.map((contact) => contact.email) || [];

      const existingPhones =
        currentContacts?.map((contact) => contact.phone) || [];

      // Filter contacts that already exist
      const filteredContacts = contacts.filter((contact) => {
        const hasExistingEmail =
          contact.email?.[0] && existingEmails.includes(contact.email?.[0]);
        const hasExistingPhone =
          contact.tel?.[0] && existingPhones.includes(contact.tel?.[0]);
        return !hasExistingEmail && !hasExistingPhone;
      });

      // If all contacts already exist, show error
      if (filteredContacts.length === 0) {
        toast({
          title: "All Contacts selected already exist",
          description: "Check your contacts list",
          variant: "danger",
        });
        return;
      }

      // If some contacts already exist, show error
      if (filteredContacts.length !== contacts.length) {
        toast({
          title: "Some contacts selected already exist",
          description: "Check your contacts list",
          variant: "danger",
        });
      }

      // Create contacts
      for (const filteredContact of filteredContacts) {
        const contactResponse = await clientApiProvider.contact.createContact({
          contact: adaptContactInfoParam(filteredContact),
          user_id: user?.id || "",
        });

        if (!contactResponse.ok) {
          throw new Error("Error creating contact: " + contactResponse.error);
        }

        toast({
          title: "Contact imported",
          description: "Contact imported successfully",
          variant: "success",
        });

        router.refresh();
      }
    } catch (error) {
      console.error("Error selecting contact:", error);
    }
  }, [currentContacts, toast, user]);

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
    email: contactInfo.email?.[0],
    phone: contactInfo.tel?.[0],
    image: contactInfo.icon?.[0],
    isImported: true,
  };
  return contact;
};
