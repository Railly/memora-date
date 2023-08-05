"use client";
import { Control, FieldErrors, UseFormSetValue } from "react-hook-form";
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
import { useEffect } from "react";
import { EMPTY_CONTACT } from "./constants";

interface IContactSettingsProps {
  control: Control<CreateEventSchema>;
  contacts: Contact[];
  errors: FieldErrors<CreateEventSchema>;
  contact?: CreateEventSchema["contact"];
  setValue: UseFormSetValue<CreateEventSchema>;
}
export const ContactSettings: React.FC<IContactSettingsProps> = ({
  control,
  contacts,
  errors,
  contact,
  setValue,
}) => {
  const updateContactValues = () => {
    const selectedContact = contacts.find(
      (_contact) => contact?.selectedContact === _contact?.id
    );
    setValue("contact.full_name", selectedContact?.full_name ?? "");
    setValue("contact.email", selectedContact?.email ?? "");
    setValue("contact.phone", selectedContact?.phone ?? "");
    setValue("contact.image", selectedContact?.image_url ?? "");
  };

  useEffect(() => {
    updateContactValues();
  }, [contact?.selectedContact]);

  return (
    <div className="space-y-2">
      <p className="text-[#B4B4B4] text-sm">Contact Settings</p>
      <div className="space-y-5">
        <div className="flex items-center w-full gap-5">
          <FormField
            control={control}
            name="contact.selectedContact"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full h-full transition duration-200 ease-in-out">
                <FormLabel htmlFor={field.name}>
                  Select an existing contact
                </FormLabel>
                <FormControl className="flex gap-4">
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger
                      id={field.name}
                      disabled={contacts.length === 0}
                    >
                      <SelectValue placeholder="Select a contact"></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {contacts.concat(EMPTY_CONTACT).map((contact) => (
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
          <p className="flex w-full mt-5 text-xs">
            or insert it manually below
          </p>
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
                    withIcon={<IconUser size={20} />}
                    variant={errors.contact?.full_name ? "error" : "default"}
                    value={field.value}
                    disabled={Boolean(contact?.selectedContact)}
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
                    withIcon={<IconPhone size={20} />}
                    variant={errors.contact?.phone ? "error" : "default"}
                    value={field.value}
                    disabled={Boolean(contact?.selectedContact)}
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
                    withIcon={<IconMail size={20} />}
                    variant={errors.contact?.email ? "error" : "default"}
                    value={field.value}
                    disabled={Boolean(contact?.selectedContact)}
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
