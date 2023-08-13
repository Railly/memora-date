"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { IconSearch, IconX } from "@tabler/icons-react";

import { useSearch } from "@/hooks/useSearch";
import { Contact } from "@/lib/entities.types";
import { debugFormValues } from "@/lib/utils";
import { ContactSchema } from "@/schemas/contact.schema";
import clientApiProvider from "@/services/client";
import { FloatingActionButton } from "../shared/atoms/FAB";
import ContactsEmptyState from "../shared/molecules/contacts-empty-state";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";
import ContactCard from "./molecules/contact-card";
import { ContactDialog } from "./molecules/contact-dialog";
import ContactPicker from "./molecules/contact-picker";

interface IContactsSectionProps {
  initialContacts: Contact[] | null;
  user: User;
}

export const ContactsSection: React.FC<IContactsSectionProps> = ({
  initialContacts,
  user,
}) => {
  const [contacts, setContacts] = useState<Contact[] | null>(initialContacts);

  const router = useRouter();

  const { toast } = useToast();

  const { search, setSearch, handleSupabaseSearch } = useSearch();

  const onSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parsedSearch = handleSupabaseSearch();

    if (!parsedSearch) return;

    // Search
    const { data, error } = await clientApiProvider.contact.searchContact({
      column: "name_email_phone",
      searchTerm: parsedSearch,
    });

    setContacts(data);

    console.log({ data, error });
  };

  const clearSearch = () => {
    setSearch("");
    setContacts(initialContacts);
  };

  const onCreateContact = async (data: ContactSchema) => {
    const contact = {
      ...data,
      user_id: user.id,
    };
    const response = await clientApiProvider.contact.createContact({
      contact: contact,
      user_id: user.id,
    });

    setContacts((prevContacts) => [...(prevContacts ?? []), response.data]);

    router.refresh();
  };

  const onUpdatedContact = async (data: ContactSchema, contact_id: string) => {
    const oldPath =
      contacts?.find(
        (contact) => contact.id === contact_id && contact.image_url !== null
      )?.image_url ?? null;

    const contact = {
      ...data,
      contact_id: contact_id,
      oldPath,
    };

    const response = await clientApiProvider.contact.updateContact({
      contact: contact,
      user_id: user.id,
    });

    setContacts(
      contacts?.map((contact) =>
        contact.id === contact_id ? response.data[0] : contact
      ) ?? []
    );

    debugFormValues({
      title: "Contact updated successfully",
      data: response.data,
      toast,
    });
  };

  const onDeleteContact = async (
    contact_id: string,
    contact_image: string | null
  ) => {
    const { data, error } = await clientApiProvider.contact.deleteContact({
      contact_id,
      image_url: contact_image,
    });
    setContacts(contacts?.filter((contact) => contact.id !== contact_id) ?? []);

    router.refresh();
    console.log({ data, error });
  };

  return (
    <section className="flex flex-col items-center w-full gap-6">
      <form onSubmit={onSearch} className="flex w-full">
        <Input
          id="search-contacts"
          placeholder="Search for contacts"
          leftIcon={<IconSearch size={20} />}
          rightIcon={
            <>
              {search.length > 0 && (
                <IconX
                  size={20}
                  className="cursor-pointer"
                  onClick={clearSearch}
                />
              )}
            </>
          }
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          variant={"default"}
        />
      </form>
      <ContactPicker
        currentContacts={contacts}
        setCurrentContacts={setContacts}
        user={user}
      />
      {contacts?.map((contact) => (
        <ContactCard
          key={contact.id}
          contact={contact}
          onUpdateContact={onUpdatedContact}
          onDeleteContact={onDeleteContact}
        />
      ))}
      {contacts?.length === 0 && (
        <ContactsEmptyState onCreatedContact={onCreateContact} />
      )}
      <ContactDialog onCreatedContact={onCreateContact}>
        {<FloatingActionButton />}
      </ContactDialog>
    </section>
  );
};
