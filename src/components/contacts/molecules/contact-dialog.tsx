"use client";

import {
  IconCheck,
  IconLoader2,
  IconMail,
  IconPhone,
  IconUser,
  IconX,
} from "@tabler/icons-react";
import { useState } from "react";
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
  contact?: Contact;
  onUpdatedContact?: (submit: ContactSchema, contact_id: string) => void;
  onCreatedContact?: (submit: ContactSchema) => void;
  children?: React.ReactNode;
  triggerClassName?: string;
}

export const ContactDialog: React.FC<IContactCardProps> = ({
  contact,
  onUpdatedContact,
  onCreatedContact,
  children,
  triggerClassName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      full_name: contact?.full_name ?? "",
      email: contact?.email ?? "",
      phone: contact?.phone ?? "",
      image: contact?.image_url ?? undefined,
    },
  });

  const {
    formState: { errors },
    reset,
  } = form;

  const clearForm = () => {
    reset();
  };

  const onSubmit = async (submit: ContactSchema) => {
    if (onUpdatedContact && contact) {
      onUpdatedContact(submit, contact.id);
    }
    if (onCreatedContact) {
      onCreatedContact(submit);
      setTimeout(() => {
        clearForm();
      }, 100);
    }
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} modal>
      <DialogTrigger
        aria-controls={
          contact ? `update-contact-${contact.id}` : "create-contact"
        }
        className={triggerClassName}
      >
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{contact ? "Update" : "Create"} Contact</DialogTitle>
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
                        image={contact?.image_url ?? undefined}
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
                  onClick={() => setIsOpen(false)}
                  disabled={form.formState.isSubmitting}
                >
                  <IconX size={20} />
                  <span>Cancel</span>
                </Button>
                <Button
                  disabled={form.formState.isSubmitting}
                  type="submit"
                  className="flex w-full gap-1"
                >
                  {form.formState.isSubmitting ? (
                    <IconLoader2 className="w-4 h-4 transition ease-in-out left-20 animate-spin inset-x-32" />
                  ) : (
                    <IconCheck size={20} />
                  )}
                  <span>{contact ? "Update" : "Create"}</span>
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
