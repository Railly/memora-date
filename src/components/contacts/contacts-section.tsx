"use client";

import { User } from "@supabase/supabase-js";
import { IconSearch, IconX } from "@tabler/icons-react";
import { useRef, useState } from "react";

import { Contact } from "@/lib/entities.types";
import { debugFormValues } from "@/lib/utils";
import { ContactSchema } from "@/schemas/contact.schema";
import clientApiProvider from "@/services/client";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";
import ContactCard from "./molecules/contact-card";
import ContactPicker from "./molecules/contact-picker";

interface IContactsSectionProps {
  initialContacts: Contact[] | null;
  user: User;
}

export const ContactsSection: React.FC<IContactsSectionProps> = ({
  initialContacts,
  user,
}) => {
  const [search, setSearch] = useState("");
  const [contacts, setContacts] = useState<Contact[] | null>(initialContacts);

  const previousSearch = useRef(search);

  const { toast } = useToast();

  const onSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Split search by spaces
    const splittedSearch = search.split(" ");
    // Remove empty strings
    const filteredSearch = splittedSearch.filter((search) => search !== "");
    // Join by &
    const parsedSearch = filteredSearch.join("&");
    // Trim
    const trimmedSearch = parsedSearch.trim();
    // If empty, return
    if (trimmedSearch.length === 0) return;

    // If same as previous, return
    const currentParsedSearch = trimmedSearch.toLowerCase();
    const previousSearchParsed = previousSearch.current.toLowerCase();
    if (currentParsedSearch === previousSearchParsed) return;

    // Update previous search
    previousSearch.current = parsedSearch;

    // Search
    const { data, error } = await clientApiProvider.contact.searchContact({
      column: "name_email_phone",
      searchTerm: parsedSearch,
    });

    setContacts(data);

    console.log({ data, error });
  };

  const onUpdatedContact = async (data: ContactSchema, contact_id: string) => {
    const contact = {
      ...data,
      contact_id: contact_id,
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

  const onDeleteContact = async (contact_id: string) => {
    const { data, error } = await clientApiProvider.contact.deleteContact({
      contact_id,
    });
    setContacts(contacts?.filter((contact) => contact.id !== contact_id) ?? []);
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
                  onClick={() => {
                    setSearch("");
                    setContacts(initialContacts);
                  }}
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
    </section>
  );
};
