"use client";

import { useRef, useState } from "react";
import { User } from "@supabase/supabase-js";
import { IconSearch, IconX } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

import { useSearch } from "@/hooks/useSearch";
import { Contact } from "@/lib/entities.types";
import { cn } from "@/lib/utils";
import { ContactSchema } from "@/schemas/contact.schema";
import clientApiProvider from "@/services/client";
import { FloatingActionButton } from "../shared/atoms/FAB";
import ContactsEmptyState from "../shared/molecules/contacts-empty-state";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";
import ContactCard, { ContactCardSkeleton } from "./molecules/contact-card";
import { ContactDialog } from "./molecules/contact-dialog";
import ContactPicker from "./molecules/contact-picker";
import {
  parseContactBeforeCreate,
  parseContactBeforeUpdate,
} from "./contacts.helpers";

interface IContactsSectionProps {
  contacts: Contact[] | null;
  user: User | null;
  isSkeleton?: boolean;
}

export const ContactsSection: React.FC<IContactsSectionProps> = ({
  contacts,
  isSkeleton,
  user,
}) => {
  const [results, setResults] = useState(contacts);

  const router = useRouter();

  const { toast } = useToast();

  const { search, setSearch, handleSupabaseSearch, onClearSearch } =
    useSearch();

  const onSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parsedSearch = handleSupabaseSearch();

    if (!parsedSearch) return;

    try {
      // Search
      const { data, error } = await clientApiProvider.contact.searchContact({
        column: "name_email_phone",
        searchTerm: parsedSearch,
      });

      setResults(data);

      router.refresh();
      console.log({ data, error });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error searching contact",
        description: "Please try again later",
        variant: "danger",
      });
    }
  };

  const clearSearch = () => {
    onClearSearch();
    setResults(contacts);
  };

  const onCreateContact = async (data: ContactSchema) => {
    if (!user) return;
    const contact = parseContactBeforeCreate({
      contact: data,
      allContacts: contacts,
    });

    if (contact.alreadyExists) {
      toast({
        title: "Contact already exists",
        description: "Check your contacts list",
        variant: "danger",
      });
      return;
    }

    try {
      const response = await clientApiProvider.contact.createContact({
        contact: contact.data,
        user_id: user.id,
      });

      if (response.ok) {
        toast({
          title: "Contact created",
          description: "Contact created successfully",
          variant: "success",
        });
      }

      router.refresh();
    } catch (error) {
      console.log(error);
      toast({
        title: "Error creating contact",
        description: "Please try again later",
        variant: "danger",
      });
    }
  };

  const onUpdatedContact = async (data: ContactSchema, contact_id: string) => {
    if (!user) return;
    const contact = parseContactBeforeUpdate({
      allContacts: contacts,
      contact: data,
      contact_id,
    });
    try {
      const response = await clientApiProvider.contact.updateContact({
        contact,
        user_id: user.id,
      });

      if (response.ok) {
        toast({
          title: "Contact updated",
          description: "Contact updated successfully",
          variant: "success",
        });
      }

      router.refresh();
    } catch (error) {
      console.log(error);
      toast({
        title: "Error updating contact",
        description: "Please try again later",
        variant: "danger",
      });
    }
  };

  const onDeleteContact = async (
    contact_id: string,
    contact_image: string | null
  ) => {
    try {
      const response = await clientApiProvider.contact.deleteContact({
        contact_id,
        image_url: contact_image,
      });
      if (response.ok) {
        toast({
          title: "Contact deleted",
          description: "Contact deleted successfully",
          variant: "success",
        });
      }
      router.refresh();
    } catch (error) {
      console.log(error);
      toast({
        title: "Error deleting contact",
        description: "Please try again later",
        variant: "danger",
      });
    }
  };

  return (
    <section className="flex flex-col w-full gap-4">
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
        <Button
          type="submit"
          variant="secondary"
          className={cn("ml-2", {
            "opacity-50 cursor-not-allowed": search.length === 0,
          })}
          disabled={search.length === 0}
        >
          <IconSearch
            size={20}
            className={cn("mr-2", {
              "text-gray-400": search.length === 0,
            })}
          />
          <span
            className={cn("text-sm font-semibold", {
              "text-gray-400": search.length === 0,
            })}
          >
            Search
          </span>
        </Button>
      </form>
      <ContactPicker currentContacts={contacts} user={user} />

      <main className="md:h-[84vh] md:overflow-y-auto pb-0 md:pb-16 pr-0 md:pr-2">
        <div className="flex flex-col gap-4">
          {isSkeleton
            ? Array.from({ length: 3 }, (_, index) => (
                <ContactCardSkeleton key={index} />
              ))
            : (search.length > 0 ? results : contacts)?.map((contact) => (
                <ContactCard
                  key={contact.id}
                  contact={contact}
                  onUpdateContact={onUpdatedContact}
                  onDeleteContact={onDeleteContact}
                />
              ))}

          {(contacts?.length === 0 || results?.length === 0) && (
            <ContactsEmptyState onCreatedContact={onCreateContact} />
          )}
        </div>
      </main>
      <ContactDialog onCreatedContact={onCreateContact}>
        {<FloatingActionButton />}
      </ContactDialog>
    </section>
  );
};
