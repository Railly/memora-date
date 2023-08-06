"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Contact, EventType } from "@/lib/entities.types";
import { Button } from "@/components/ui/button";
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
import { User } from "@supabase/supabase-js";
import { SubHeader } from "@/components/shared/molecules/sub-header";
import { debugFormValues } from "@/lib/utils";
import { IconCalendar, IconX } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

interface ICreateEventFormProps {
  eventTypes: EventType[] | null;
  contacts: Contact[] | null;
  user: User;
}

const CreateEventForm: React.FC<ICreateEventFormProps> = ({
  eventTypes,
  contacts,
  user,
}) => {
  const form = useForm<CreateEventSchema>({
    resolver: zodResolver(createEventSchema),
    defaultValues: defaultValues as CreateEventSchema,
  });
  const isRecurring = form.watch("reminder.reminder_type") === "RECURRING";
  const isWeekly = form.watch("reminder.interval") === "WEEKLY";
  const contact = form.watch("contact");
  const { toast } = useToast();
  const router = useRouter();
  const goBack = () => router.back();

  console.log({
    formValues: form.getValues(),
  });

  const onSubmit = async (data: CreateEventSchema) => {
    debugFormValues({ data, toast });

    const contactResponse = await clientApiProvider.contact.createContact({
      contact: data.contact,
      user_id: user.id,
    });

    const eventResponse = await clientApiProvider.event.createEvent({
      event: data.event,
      event_type_id: data.event_type.type,
      contact_id: contactResponse.data.id,
      user_id: user.id,
    });

    const reminderResponse = await clientApiProvider.reminder.createReminder({
      reminder: data.reminder,
      event_id: eventResponse.data.id,
    });

    debugFormValues({
      title: "Event created successfully",
      data: {
        contactResponse,
        eventResponse,
        reminderResponse,
      },
      toast,
    });

    // TODO: Redirect to event page
    // router.push(`/events/${eventResponse.data.id}`);
    router.push("/events");
  };

  return (
    <Form {...form}>
      <SubHeader className="px-3 pt-3" title="New Event" />
      <form
        className="flex flex-col gap-6 p-3"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <BasicInformation
          control={form.control}
          errors={form.formState.errors}
          eventTypes={eventTypes}
        />
        <NotificationSettings
          control={form.control}
          errors={form.formState.errors}
          user={user}
        />
        <ReminderSettings
          control={form.control}
          errors={form.formState.errors}
          isRecurring={isRecurring}
          isWeekly={isWeekly}
          setValue={form.setValue}
        />
        <ContactSettings
          control={form.control}
          errors={form.formState.errors}
          contacts={contacts}
          contact={contact}
          setValue={form.setValue}
        />
        <div className="flex w-full gap-4">
          <Button
            variant="secondary"
            type="submit"
            className="flex w-full gap-1"
            onClick={goBack}
          >
            <IconX size={20} />
            <span>Cancel</span>
          </Button>
          <Button type="submit" className="flex w-full gap-1">
            <IconCalendar size={20} />
            <span>Create Event</span>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateEventForm;
