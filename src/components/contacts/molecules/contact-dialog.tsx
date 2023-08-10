"use client";

import {
  IconCheck,
  IconMail,
  IconPencil,
  IconPhone,
  IconUser,
  IconX,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { UploadProfileImage } from "@/components/forms/event/upload-profile-image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormErrorMessage,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Contact } from "@/lib/entities.types";
import { ContactSchema, contactSchema } from "@/schemas/contact.schema";
import { zodResolver } from "@hookform/resolvers/zod";

interface IContactCardProps {
  contact: Contact;
  onUpdatedContact: (submit: ContactSchema, contact_id: string) => void;
}

export const ContactDialog: React.FC<IContactCardProps> = ({
  contact,
  onUpdatedContact,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
  });

  const {
    setValue,
    formState: { errors },
    reset,
  } = form;

  const updateContactValues = () => {
    const { full_name, email, phone, image_url } = contact;
    setValue("full_name", full_name ?? "");
    setValue("email", email ?? "");
    setValue("phone", phone ?? "");
    setValue("image", image_url ?? "");
  };

  const onSubmit = async (submit: ContactSchema) => {
    onUpdatedContact(submit, contact.id);
    setIsOpen(false);
    reset();
  };

  useEffect(() => {
    updateContactValues();
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        aria-controls="dialog"
        className="p-0.5 rounded-sm bg-white"
      >
        <IconPencil size={24} className="stroke-black" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Contact</DialogTitle>
        </DialogHeader>
        <Separator />
        <Form {...form}>
          <form
            className="p-4 space-y-2 border rounded-sm border-opacity-20 bg-muted/40 border-input-border"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex gap-5">
              <FormField
                control={form.control}
                name="full_name"
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
                        variant={errors?.full_name ? "error" : "default"}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormErrorMessage name={field.name} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
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
                        variant={errors?.phone ? "error" : "default"}
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
                control={form.control}
                name="email"
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
                        variant={errors?.email ? "error" : "default"}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormErrorMessage name={field.name} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
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
            <DialogFooter>
              <div className="flex w-full gap-4 mt-4">
                <Button
                  variant="secondary"
                  className="flex w-full gap-1"
                  type="button"
                  onClick={() => {
                    form.reset();
                    setIsOpen(false);
                  }}
                >
                  <IconX size={20} />
                  <span>Cancel</span>
                </Button>
                <Button type="submit" className="flex w-full gap-1">
                  <IconCheck size={20} />
                  <span>Save Changes</span>
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
