"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { IconArrowLeft } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Contact, EventType } from "@/types/entities";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import clientApiProvider from "@/services/client";
import { BasicInformation } from "@/components/forms/event/basic-information";
import { NotificationSettings } from "@/components/forms/event/notification-settings";
import { Form } from "@/components/ui/form";
import { ReminderSettings } from "@/components/forms/event/reminder-settings";
import { ContactSettings } from "@/components/forms/event/contact-settings";
import {
  CreateEventSchema,
  createEventSchema,
  defaultValues,
} from "@/schemas/create-event.schema";
import { useToast } from "@/components/ui/use-toast";
import { Session } from "@supabase/supabase-js";

export default function CreateEventPage() {
  const [eventTypes, setEventTypes] = useState<EventType[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [session, setSession] = useState<Session | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    (async () => {
      try {
        const [eventTypesResult, contactsResult, sessionResult] =
          await Promise.allSettled([
            clientApiProvider.event.getEventTypes(),
            clientApiProvider.contact.getContacts(),
            clientApiProvider.auth.getSession(),
          ]);
        if (eventTypesResult.status === "fulfilled") {
          const eventTypes = eventTypesResult.value;
          setEventTypes(eventTypes.data);
        } else {
          const eventTypesError = eventTypesResult.reason;
          toast({
            title: eventTypesError.message,
            variant: "destructive",
          });
        }
        if (contactsResult.status === "fulfilled") {
          const contacts = contactsResult.value;
          setContacts(contacts.data);
        } else {
          const contactsError = contactsResult.reason;
          toast({
            title: contactsError.message,
            variant: "destructive",
          });
        }

        if (sessionResult.status === "fulfilled") {
          const session = sessionResult.value;
          console.log({
            session,
          });
          setSession(session.data.session);
        }
      } catch (error) {
        console.log({ error });
        if (error instanceof Error) {
          toast({
            title: error.message,
            variant: "destructive",
          });
        }
      }
    })();
  }, []);

  const form = useForm<CreateEventSchema>({
    resolver: zodResolver(createEventSchema),
    defaultValues: defaultValues as CreateEventSchema,
  });
  const isRecurring = form.watch("reminder.reminder_type") === "RECURRING";
  const isWeekly = form.watch("reminder.interval") === "WEEKLY";
  const contact = form.watch("contact");

  const router = useRouter();
  const goBack = () => router.back();

  console.log({
    formValues: form.getValues(),
    errors: form.formState.errors,
  });

  function onSubmit(data: CreateEventSchema) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-6 p-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex items-center gap-2">
          <Button
            type="button"
            onClick={goBack}
            className="p-0 px-2"
            variant="outline"
          >
            <IconArrowLeft size={20} />
          </Button>
          <h1 className="text-xl">New Event</h1>
        </div>
        <BasicInformation
          control={form.control}
          errors={form.formState.errors}
          eventTypes={eventTypes}
        />
        <NotificationSettings
          control={form.control}
          errors={form.formState.errors}
          user={session?.user}
        />
        <ReminderSettings
          control={form.control}
          errors={form.formState.errors}
          isRecurring={isRecurring}
          isWeekly={isWeekly}
        />
        <ContactSettings
          control={form.control}
          errors={form.formState.errors}
          contacts={contacts}
          contact={contact}
          setValue={form.setValue}
        />
        <Button type="submit" className="mt-6">
          Create Event
        </Button>
      </form>
    </Form>
  );
}
