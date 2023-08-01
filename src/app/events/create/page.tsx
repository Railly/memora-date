"use client";
import {
  CreateEventSchema,
  createEventSchema,
  defaultValues,
} from "@/schemas/event.schema";
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

export default function CreateEventPage() {
  const [eventTypes, setEventTypes] = useState<EventType[]>([]);

  useEffect(() => {
    (async () => {
      const response = await clientApiProvider.event.getEventTypes();
      setEventTypes(response.data);
    })();
  }, []);

  const { register, handleSubmit, control, formState, ...rest } =
    useForm<CreateEventSchema>({
      resolver: zodResolver(createEventSchema),
      defaultValues: defaultValues,
    });
  const router = useRouter();

  const goBack = () => router.back();

  const onSubmit = (data: CreateEventSchema) => {
    console.log({ data });
  };

  return (
    <Form
      {...{
        register,
        handleSubmit,
        control,
        formState,
        ...rest,
      }}
    >
      <form
        className="flex flex-col gap-4 px-4 pt-10"
        onSubmit={handleSubmit(onSubmit)}
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
          register={register}
          control={control}
          errors={formState.errors}
          eventTypes={eventTypes}
        />
        <NotificationSettings control={control} />
        <ReminderSettings control={control} />
        <ContactSettings control={control} />
        <Button type="submit" className="mt-6">
          Create Event
        </Button>
      </form>
    </Form>
  );
}
