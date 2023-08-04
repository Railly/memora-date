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
import { getFilesInBucket, uploadFile } from "@/lib/supabase";
import { SubHeader } from "@/components/shared/molecules/sub-header";

export default function CreateEventPage() {
  const [eventTypes, setEventTypes] = useState<EventType[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [session, setSession] = useState<Session | null>(null);
  const { toast } = useToast();

  // const getAllImages = async () => {
  //   const images = await getFilesInBucket({
  //     supabase: clientApiProvider.supabase,
  //     bucket: "profiles",
  //     folder: "admin",
  //   });
  //   console.log({ images });
  // };

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

  const onSubmit = async (data: CreateEventSchema) => {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });

    const user_id = session?.user.id;
    if (!user_id) {
      throw new Error("User is not logged in");
    }

    const contactResponse = await createContact({
      contact: data.contact,
      user_id,
    });

    const eventResponse = await createEvent({
      event: data.event,
      event_type_id: data.event_type.type,
      contact_id: contactResponse.data.id,
      user_id,
    });

    const reminderResponse = await createReminder({
      reminder: data.reminder,
      event_id: eventResponse.data.id,
    });

    toast({
      title: "Event created successfully",
      variant: "default",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify(
              {
                contactResponse,
                eventResponse,
                reminderResponse,
              },
              null,
              2
            )}
          </code>
        </pre>
      ),
    });
  };

  const createContact = async ({
    contact,
    user_id,
  }: {
    contact: CreateEventSchema["contact"];
    user_id: string;
  }) => {
    if (!contact.selectedContact && contact.image) {
      // const image = await clientApiProvider.storage.uploadImage({
      //   image: contact.image,
      //   folder: "profiles",
      //   user_id,
      // });
      const image = await uploadFile({
        supabase: clientApiProvider.supabase,
        bucket: "profiles",
        filepath: contact.full_name,
        file: contact.image,
        userId: user_id,
      });
      contact.image = image.path;
    }
    const contactResponse = await clientApiProvider.contact.createContact({
      contact,
      user_id,
    });
    return contactResponse;
  };

  const createEvent = async ({
    event,
    event_type_id,
    user_id,
    contact_id,
  }: {
    event: CreateEventSchema["event"];
    user_id: string;
    event_type_id: string;
    contact_id: string;
  }) => {
    const eventResponse = await clientApiProvider.event.createEvent({
      event,
      user_id,
      event_type_id,
      contact_id,
    });
    return eventResponse;
  };

  const createReminder = async ({
    reminder,
    event_id,
  }: {
    reminder: CreateEventSchema["reminder"];
    event_id: string;
  }) => {
    const reminderResponse = await clientApiProvider.reminder.createReminder({
      reminder,
      event_id,
    });
    return reminderResponse;
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-6 p-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <SubHeader title="New Event" />
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
