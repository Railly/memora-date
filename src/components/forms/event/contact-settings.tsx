"use client";
import {
  Control,
  FieldErrors,
  UseFormSetValue,
  UseFormWatch,
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
import { Input } from "@/components/ui/input";
import { IconUser, IconPhone, IconMail } from "@tabler/icons-react";
import { UploadProfileImage } from "./upload-profile-image";
import { useEffect, useState } from "react";
import { EMPTY_CONTACT } from "./constants";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

interface IContactSettingsProps {
  control: Control<CreateEventSchema>;
  contacts: Contact[] | null;
  errors: FieldErrors<CreateEventSchema>;
  setValue: UseFormSetValue<CreateEventSchema>;
  watch: UseFormWatch<CreateEventSchema>;
}
export const ContactSettings: React.FC<IContactSettingsProps> = ({
  control,
  contacts,
  errors,
  setValue,
  watch,
}) => {
  const contact = watch("contact");
  const [isNewContact, setIsNewContact] = useState(false);
  const isInputDisabled = Boolean(contact?.selectedContact) || !isNewContact;
  const hasContacts = Boolean(contacts?.length);
  const shouldDisableContactSelection = isNewContact || !hasContacts;
  const labelVariant = isNewContact && hasContacts ? "default" : "disabled";

  const updateContactValues = () => {
    const selectedContact = contacts?.find(
      (_contact) => contact?.selectedContact === _contact?.id
    );
    setValue("contact.full_name", selectedContact?.full_name ?? "");
    setValue("contact.email", selectedContact?.email ?? "");
    setValue("contact.phone", selectedContact?.phone ?? "");
    setValue("contact.image", selectedContact?.image_url ?? "");
  };

  useEffect(() => {
    updateContactValues();
  }, [contact?.selectedContact, isNewContact]);

  useEffect(() => {
    if (!Boolean(contacts?.length)) {
      setIsNewContact(true);
    }
  }, [contacts]);

  useEffect(() => {
    if (isNewContact) {
      setValue("contact.selectedContact", "");
      setValue("contact.full_name", "");
    }
  }, [isNewContact]);

  return (
    <div className="p-4 space-y-2 border rounded-sm bg-muted/40 border-form-stroke/20">
      <div className="flex items-center justify-between w-full gap-4">
        <p className="text-[#B4B4B4] text-md">Contact Settings</p>
        <FormField
          control={control}
          name="contact"
          render={() => (
            <FormItem className="flex items-center gap-2 space-y-0 transition duration-200 ease-in-out">
              <FormLabel htmlFor="isNewContact" variant={labelVariant}>
                Create new contact?
              </FormLabel>
              <FormControl>
                <Switch
                  checked={isNewContact}
                  onCheckedChange={setIsNewContact}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      <Separator />
      <div className="space-y-5">
        <div className="flex items-center w-full gap-5">
          <FormField
            control={control}
            name="contact.selectedContact"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full h-full mt-1 transition duration-200 ease-in-out">
                <FormLabel htmlFor={field.name} variant={labelVariant}>
                  Select an existing contact
                </FormLabel>
                <FormControl className="flex gap-4">
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger
                      id={field.name}
                      disabled={shouldDisableContactSelection}
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
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-5">
          <FormField
            control={control}
            name="contact.full_name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor={field.name}>Full name</FormLabel>
                <FormControl>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="text"
                    placeholder="John Doe"
                    leftIcon={<IconUser size={20} />}
                    variant={errors.contact?.full_name ? "error" : "default"}
                    value={field.value}
                    disabled={isInputDisabled}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormErrorMessage name={field.name} />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="contact.phone"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor={field.name}>Phone</FormLabel>
                <FormControl>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="text"
                    placeholder="+51 987 654 321"
                    leftIcon={<IconPhone size={20} />}
                    variant={errors.contact?.phone ? "error" : "default"}
                    value={field.value}
                    disabled={isInputDisabled}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormErrorMessage name={field.name} />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-5">
          <FormField
            control={control}
            name="contact.email"
            render={({ field }) => (
              <FormItem className="w-9/12">
                <FormLabel htmlFor={field.name}>Email</FormLabel>
                <FormControl>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="text"
                    placeholder="exampleo@mail.com"
                    leftIcon={<IconMail size={20} />}
                    variant={errors.contact?.email ? "error" : "default"}
                    value={field.value}
                    disabled={isInputDisabled}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormErrorMessage name={field.name} />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="contact.image"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name}>Image</FormLabel>
                <FormControl>
                  <UploadProfileImage
                    fullName={contact?.full_name}
                    onChange={field.onChange}
                    disabled={isInputDisabled}
                  />
                </FormControl>
                <FormErrorMessage name={field.name} />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};
