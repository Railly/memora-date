"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { IconArrowLeft } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { EventType } from "@/types/entities";
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
import { toast } from "@/components/ui/use-toast";

export default function CreateEventPage() {
  const [eventTypes, setEventTypes] = useState<EventType[]>([]);

  useEffect(() => {
    (async () => {
      const response = await clientApiProvider.event.getEventTypes();
      setEventTypes(response.data);
    })();
  }, []);

  const form = useForm<CreateEventSchema>({
    resolver: zodResolver(createEventSchema),
    defaultValues: defaultValues as CreateEventSchema,
  });
  const isRecurring = form.watch("reminder.reminder_type") === "RECURRING";
  const isWeekly = form.watch("reminder.interval") === "WEEKLY";

  const router = useRouter();

  console.log({
    errors: form.formState.errors,
  });

  const goBack = () => router.back();

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

  console.log({
    formValues: form.getValues(),
  });

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
        />
        <ReminderSettings
          control={form.control}
          errors={form.formState.errors}
          isRecurring={isRecurring}
          isWeekly={isWeekly}
        />
        <ContactSettings control={form.control} />
        <Button type="submit" className="mt-6">
          Create Event
        </Button>
      </form>
    </Form>
  );
}
