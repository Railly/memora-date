"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Contact, EventType, EventWithType } from "@/lib/entities.types";
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
import { Session } from "@supabase/supabase-js";
import { SubHeader } from "@/components/shared/molecules/sub-header";
import { debugFormValues } from "@/lib/utils";
import { IconCalendar, IconLoader2, IconX } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface IEditEventFormProps {
  eventTypes: EventType[] | null;
  contacts: Contact[] | null;
  session: Session | null;
  event?: EventWithType | null;
  isSkeleton?: boolean;
}

const EditEventForm: React.FC<IEditEventFormProps> = ({
  eventTypes,
  contacts,
  session,
  event,
  isSkeleton,
}) => {
  const form = useForm<CreateEventSchema>({
    resolver: zodResolver(createEventSchema),
    defaultValues: defaultValues as CreateEventSchema,
  });
  const { toast } = useToast();
  const router = useRouter();
  const goBack = () => router.back();
  const [isSectionReady, setIsSectionReady] = useState({
    basicInformation: false,
    reminderSettings: false,
    contactSettings: false,
  });

  const onSubmit = async (data: CreateEventSchema) => {
    debugFormValues({ data, toast });
    if (!session || !event) return;

    let contactId: string | null = null;
    if ("selectedContact" in data.contact && data.contact.selectedContact) {
      contactId = data.contact.selectedContact;
    }

    let reminderId: string | null = null;
    if (data.reminder.isEnabled && event.reminder?.[0]) {
      reminderId = event.reminder?.[0].id;
    }

    const eventResponse = await clientApiProvider.event.updateEvent({
      event: {
        description: data.event.description,
        event_id: event.id,
        is_public: data.event.is_public,
        name: data.event.name,
        is_contact_enabled: data.contact.isEnabled,
        is_reminder_enabled: data.reminder.isEnabled,
      },
      event_type_id: data.event_type.type,
      contact_id: contactId,
    });

    const reminderResponse = await clientApiProvider.reminder.updateReminder({
      reminder: data.reminder,
      event_id: event.id,
      reminder_id: reminderId,
      message_schedule_id: event.reminder?.[0].message_schedule_id,
    });

    debugFormValues({
      title: "Event created successfully",
      data: {
        eventResponse,
        reminderResponse,
      },
      toast,
    });

    router.push(`/events/details/${event.id}`);
    router.refresh();
  };

  useEffect(() => {
    if (!event) return;
    const currentEventType = eventTypes?.find(
      (eventType) => eventType.id === event.event_type_id
    );
    event.description && form.setValue("event.description", event.description);
    event.name && form.setValue("event.name", event.name);
    event.is_public && form.setValue("event.is_public", event.is_public);
    currentEventType && form.setValue("event_type.type", currentEventType?.id);
    setIsSectionReady((prev) => ({ ...prev, basicInformation: true }));

    const reminder = event.reminder?.[0];

    if (reminder) {
      form.setValue("reminder.isEnabled", event.is_reminder_enabled);
      setIsSectionReady((prev) => ({ ...prev, reminderSettings: true }));
      setTimeout(() => {
        const date = reminder?.date && new Date(reminder.date);
        date && form.setValue("reminder.date", date);
        reminder.time && form.setValue("reminder.time", reminder.time);
        if (
          reminder.notification_methods.includes("EMAIL") ||
          reminder.notification_methods.includes("SMS")
        ) {
          form.setValue(
            "reminder.notification_methods",
            reminder.notification_methods as Array<"EMAIL" | "SMS">
          );
        }
        if (
          reminder.reminder_type === "ONE_TIME" ||
          reminder.reminder_type === "RECURRING"
        ) {
          form.setValue("reminder._.reminder_type", reminder.reminder_type);
          setTimeout(() => {
            reminder.interval_unit &&
              form.setValue(
                "reminder._.interval.unit",
                reminder.interval_unit as any
              );
            reminder.interval_value &&
              form.setValue(
                "reminder._.interval.value",
                reminder.interval_value
              );
            const recurrenceType: ("Until" | "After") | null =
              reminder?.recurrence_type as any;

            recurrenceType &&
              form.setValue("reminder._.recurrence.type", recurrenceType);

            const recurrenceValue =
              recurrenceType === "Until"
                ? reminder.recurrence_value &&
                  new Date(reminder.recurrence_value)
                : reminder.recurrence_value &&
                  parseInt(reminder.recurrence_value);

            recurrenceValue &&
              form.setValue("reminder._.recurrence.value", recurrenceValue);
          }, 100);
        }
      }, 100);
    }
    event.contact_id &&
      form.setValue("contact.isEnabled", event.is_contact_enabled);
    setIsSectionReady((prev) => ({ ...prev, contactSettings: true }));
    event.contact_id &&
      form.setValue("contact.selectedContact", event.contact_id);
  }, [event]);

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-6 relative"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col md:h-[90vh] md:overflow-y-auto pb-2 pr-0 md:pr-2 gap-6">
          <SubHeader title="Edit Event" />
          <BasicInformation
            control={form.control}
            eventTypes={eventTypes}
            watch={form.watch}
            isSkeleton={isSkeleton || !isSectionReady.basicInformation}
            isEditing
          />
          <ReminderSettings
            control={form.control}
            watch={form.watch}
            setValue={form.setValue}
            user={session?.user}
            isEditing
            isReady={isSectionReady.reminderSettings}
          />
          <ContactSettings
            control={form.control}
            watch={form.watch}
            setValue={form.setValue}
            contacts={contacts}
            user={session?.user}
            clearErrors={form.clearErrors}
            isEditing
            isReady={isSectionReady.contactSettings}
          />
          <div className="flex w-full gap-4 fixed bottom-5 md:absolute md:bottom-0 left-0 z-20 px-3">
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
              className="flex w-full gap-1"
            >
              {form.formState.isSubmitting ? (
                <IconLoader2 className="w-4 h-4 transition ease-in-out left-20 animate-spin inset-x-32" />
              ) : (
                <IconCalendar size={20} />
              )}
              <span>Edit Event</span>
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default EditEventForm;
