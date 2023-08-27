"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Contact, EventType } from "@/lib/entities.types";
import { Button } from "@/components/ui/button";
import clientApiProvider from "@/services/client";
import { BasicInformation } from "@/components/forms/event/basic-information";
import { Form } from "@/components/ui/form";
import { ReminderSettings } from "@/components/forms/event/reminder-settings";
import { ContactSettings } from "@/components/forms/event/contact-settings";
import {
  CreateEventSchema,
  createEventSchema,
  defaultValues,
} from "@/schemas/create-event.schema";
import { useToast } from "@/components/ui/use-toast";
import { Session, User } from "@supabase/supabase-js";
import { SubHeader } from "@/components/shared/molecules/sub-header";
import { debugFormValues } from "@/lib/utils";
import { IconCalendar, IconLoader2, IconX } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

interface ICreateEventFormProps {
  eventTypes: EventType[] | null;
  contacts: Contact[] | null;
  session: Session | null;
}

const CreateEventForm: React.FC<ICreateEventFormProps> = ({
  eventTypes,
  contacts,
  session,
}) => {
  const form = useForm<CreateEventSchema>({
    resolver: zodResolver(createEventSchema),
    defaultValues: defaultValues as CreateEventSchema,
  });
  const { toast } = useToast();
  const router = useRouter();
  const goBack = () => router.back();

  const onSubmit = async (data: CreateEventSchema) => {
    debugFormValues({ data, toast });

    if (!session) return;

    let contactId: string | null = null;
    if ("selectedContact" in data.contact && data.contact.selectedContact) {
      contactId = data.contact.selectedContact;
    }

    const eventResponse = await clientApiProvider.event.createEvent({
      event: {
        description: data.event.description,
        name: data.event.name,
        is_public: data.event.is_public,
        is_reminder_enabled: data.reminder.isEnabled,
        is_contact_enabled: data.contact.isEnabled,
      },
      event_type_id: data.event_type.type,
      contact_id: contactId,
      user_id: session.user.id,
    });

    const reminderResponse = await clientApiProvider.reminder.createReminder({
      reminder: data.reminder,
      event_id: eventResponse.data.id,
    });

    debugFormValues({
      title: "Event created successfully",
      data: {
        eventResponse,
        reminderResponse,
      },
      toast,
    });

    router.push(`/events/details/${eventResponse.data.id}`);
  };

  return (
    <Form {...form}>
      <SubHeader className="mb-3" title="New Event" />
      <form
        className="flex flex-col gap-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <BasicInformation
          control={form.control}
          eventTypes={eventTypes}
          watch={form.watch}
        />
        <ReminderSettings
          control={form.control}
          watch={form.watch}
          setValue={form.setValue}
          user={session?.user}
        />
        <ContactSettings
          control={form.control}
          watch={form.watch}
          setValue={form.setValue}
          contacts={contacts}
          user={session?.user}
          clearErrors={form.clearErrors}
        />
        <div className="flex w-full gap-4 fixed bottom-5 left-0 z-20 px-3">
          <Button
            variant="secondary"
            type="button"
            className="flex w-full gap-1"
            onClick={goBack}
            disabled={form.formState.isSubmitting}
          >
            <IconX size={20} />
            <span>Cancel</span>
          </Button>
          <Button
            disabled={form.formState.isSubmitting}
            type="submit"
            className="flex w-full gap-1 contrast-75"
          >
            {form.formState.isSubmitting ? (
              <IconLoader2 className="w-4 h-4 transition ease-in-out left-20 animate-spin inset-x-32" />
            ) : (
              <IconCalendar size={20} />
            )}
            <span>Create Event</span>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateEventForm;
