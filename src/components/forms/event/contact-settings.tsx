import { Control, FieldErrors } from "react-hook-form";
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
import { Contact } from "@/types/entities";
import { Input } from "@/components/ui/input";
import { IconUser, IconPhone, IconMail, IconEdit } from "@tabler/icons-react";
import { UploadProfileImage } from "./upload-profile-image";

interface IContactSettingsProps {
  control: Control<CreateEventSchema>;
  contacts: Contact[];
  errors: FieldErrors<CreateEventSchema>;
  contactFullName: string;
}
export const ContactSettings: React.FC<IContactSettingsProps> = ({
  control,
  contacts,
  errors,
  contactFullName,
}) => {
  return (
    <div className="space-y-2">
      <p className="text-[#B4B4B4] text-sm">Contact Settings</p>
      <div className="space-y-5">
        <div className="flex items-center w-full gap-5">
          <FormField
            control={control}
            name="contact"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full h-full transition duration-200 ease-in-out">
                <FormLabel>Select an existing contact</FormLabel>
                <FormControl className="flex gap-4">
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger disabled={contacts.length === 0}>
                      <SelectValue placeholder="Select a contact"></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {contacts.map((contact) => (
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
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input
                    id="contact.full_name"
                    type="text"
                    placeholder="John Doe"
                    withIcon={<IconUser size={20} />}
                    variant={errors.contact?.full_name ? "error" : "default"}
                    value={field.value}
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
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    id="contact.phone"
                    type="text"
                    placeholder="+51 987 654 321"
                    withIcon={<IconPhone size={20} />}
                    variant={errors.contact?.phone ? "error" : "default"}
                    value={field.value}
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    id="contact.email"
                    type="text"
                    placeholder="exampleo@mail.com"
                    withIcon={<IconMail size={20} />}
                    variant={errors.contact?.email ? "error" : "default"}
                    value={field.value}
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
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <UploadProfileImage
                    fullName={contactFullName}
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
