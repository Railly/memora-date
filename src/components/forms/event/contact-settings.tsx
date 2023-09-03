"use client";
import {
  Control,
  UseFormSetValue,
  UseFormWatch,
  UseFormClearErrors,
} from "react-hook-form";
import {
  FormControl,
  FormErrorMessage,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreateEventSchema } from "@/schemas/create-event.schema";
import { Contact } from "@/lib/entities.types";
import { IconUser, IconX } from "@tabler/icons-react";
import { EMPTY_CONTACT } from "./constants";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ContactSchema } from "@/schemas/contact.schema";
import clientApiProvider from "@/services/client";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { parseContactBeforeCreate } from "@/components/contacts/contacts.helpers";
import { ContactDialog } from "@/components/contacts/molecules/contact-dialog";
import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";

interface IContactSettingsProps {
  control: Control<CreateEventSchema>;
  contacts: Contact[] | null;
  setValue: UseFormSetValue<CreateEventSchema>;
  watch: UseFormWatch<CreateEventSchema>;
  user: User | undefined;
  clearErrors: UseFormClearErrors<CreateEventSchema>;
  isEditing?: boolean;
  isReady?: boolean;
}
export const ContactSettings: React.FC<IContactSettingsProps> = ({
  control,
  contacts,
  setValue,
  watch,
  user,
  clearErrors,
  isEditing,
  isReady = true,
}) => {
  const router = useRouter();
  const selectContactUuid = watch("contact.selectedContact");
  const isContactEnabled = watch("contact.isEnabled");
  const contact = contacts?.find((c) => c.id === selectContactUuid);

  const onCreateContact = async (data: ContactSchema) => {
    if (!user) return;
    const parsedContact = parseContactBeforeCreate({
      contact: data,
    });

    try {
      const response = await clientApiProvider.contact.createContact({
        contact: parsedContact.data,
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
      setTimeout(() => {
        setValue("contact.selectedContact", response.data.id);
        clearErrors("contact.selectedContact");
      }, 1000);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error creating contact",
        description: "Please try again later",
        variant: "danger",
      });
    }
  };

  const getInitials = (name?: string) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("");
  };

  return (
    <Collapsible
      open={isContactEnabled}
      className="p-4 space-y-2 border rounded-sm bg-muted/40 border-form-stroke/20"
    >
      <div className="flex items-center justify-between w-full gap-4">
        <p className="text-foreground/80 text-md">Contact Settings</p>
        <div className="flex items-center gap-2 space-y-0 transition duration-200 ease-in-out">
          <CollapsibleTrigger asChild>
            <FormField
              control={control}
              name="contact.isEnabled"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Switch
                      disabled={isEditing && !isReady}
                      checked={field.value}
                      onCheckedChange={(value) => {
                        field.onChange(value);
                        if (!isEditing && !value) {
                          console.log({
                            isEditing,
                            "no deberia entrar": "ga",
                          });
                          setValue("contact.selectedContact", "");
                        }
                      }}
                      defaultChecked={false}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </CollapsibleTrigger>
        </div>
      </div>
      <Separator />
      <CollapsibleContent className="space-y-5">
        <div className="flex items-center w-full gap-5">
          <FormField
            control={control}
            name="contact.selectedContact"
            render={({ field, fieldState }) => (
              <FormItem className="flex flex-col w-full h-full mt-1 transition duration-200 ease-in-out">
                <FormLabel htmlFor={field.name} isRequired>
                  Select an existing contact
                </FormLabel>
                <FormControl className="flex gap-4">
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      variant={fieldState.error ? "error" : "default"}
                    >
                      <SelectValue placeholder="Select a contact"></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {contacts &&
                        contacts.concat(EMPTY_CONTACT).map((contact) => (
                          <SelectItem key={contact.id} value={contact.id}>
                            {contact.full_name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormErrorMessage name={field.name} />
              </FormItem>
            )}
          />
        </div>
        {contact?.id ? (
          <div className="flex items-center justify-between p-4 space-x-4 border border-form-stroke/20">
            <div className="flex items-center gap-4">
              <Avatar className="transition-opacity group-hover:opacity-40">
                <AvatarImage
                  src={
                    contact.image_url
                      ? `${encodeURI(
                          `https://cgkjgmtdxmqoruwpyojn.supabase.co/storage/v1/object/public/profiles/${contact?.image_url}`
                        )}`
                      : undefined
                  }
                  alt={contact?.full_name}
                />
                <AvatarFallback className="select-none">
                  {getInitials(contact?.full_name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="text-sm font-medium text-foreground">
                  {contact?.full_name}
                </p>
                <p className="text-xs text-gray-500">{contact?.email}</p>
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setValue("contact.selectedContact", "");
              }}
            >
              <IconX size={20} />
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-between p-4 space-x-4 border border-form-stroke/20">
            <div className="flex items-center gap-4 w-full">
              <Avatar className="transition-opacity group-hover:opacity-40">
                <AvatarFallback className="select-none">
                  <IconUser size={20} />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col w-full">
                <p className="text-sm font-medium text-foreground">
                  No contact selected
                </p>
                <p className="text-xs text-gray-500">Select a contact or</p>
              </div>
              <ContactDialog
                triggerClassName="w-full"
                onCreatedContact={onCreateContact}
              >
                <Button className="w-full" variant="outline" type="button">
                  <IconPlus size={20} />
                  <span className="hidden ml-2 sm:inline">
                    Create a new contact
                  </span>
                  <span className="ml-2 sm:hidden">Create</span>
                </Button>
              </ContactDialog>
            </div>
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
};
