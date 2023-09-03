"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { IconEdit, IconLogout2 } from "@tabler/icons-react";

import { eventTypeUtils } from "@/components/icons/event-type";
import { EventWithType } from "@/lib/entities.types";
import {
  cn,
  generateCards,
  parseIntervalValue,
  parseOccurrenceValue,
} from "@/lib/utils";
import clientApiProvider from "@/services/client";
import Countdown from "../dashboard/molecules/countdown";
import ProgressBar from "../dashboard/molecules/progress-bar";
import { ConfirmDialog } from "../shared/atoms/confirm-dialog";
import { Badge } from "../ui/badge";
import { Button, buttonVariants } from "../ui/button";
import { useToast } from "../ui/use-toast";
import {
  EventDetailsCard,
  EventDetailsSkeleton,
} from "./molecules/details-card";

interface IEventsSectionProps {
  event: EventWithType | null;
  isSkeleton?: boolean;
}

export const EventsDetailsSection: React.FC<IEventsSectionProps> = ({
  event,
  isSkeleton,
}) => {
  const router = useRouter();

  const { toast } = useToast();

  const goToEdit = () => router.push(`/events/edit/${event?.id}`);

  const onDeleteEvent = async ({ event_id }: { event_id: string }) => {
    if (!event) return;
    try {
      const response = await clientApiProvider.event.deleteEvent({ event_id });
      if (response.ok) {
        toast({
          title: "Event deleted successfully",
          variant: "success",
        });
      }
      router.replace("/events");
    } catch (error) {
      console.log(error);
      toast({
        title: "Error deleting event",
        variant: "danger",
      });
    }
  };

  const localDateMerged = useMemo(() => {
    if (event?.reminder?.length) {
      const date = event?.reminder[0].date;
      const time = event?.reminder[0].time;
      const rawDateMerged = new Date(`${date}T${time}`);
      return rawDateMerged.toLocaleString("en-US");
    }
    return null;
  }, [event?.reminder]);

  return (
    <section className="flex flex-col w-full gap-4 mb-2">
      {isSkeleton ? (
        <span className="w-full h-6 my-1 text-2xl font-bold bg-gray-400 animate-pulse" />
      ) : (
        <h1 className="inline-block w-full text-2xl font-bold">
          {event?.name}
        </h1>
      )}
      <div>
        <Badge
          icon={eventTypeUtils[event?.event_type?.value || "default"].icon}
          variant={eventTypeUtils[event?.event_type?.value || "default"].color}
        >
          {event?.event_type?.value || "event"}
        </Badge>
      </div>
      <Countdown reminder={event?.reminder} />
      <ProgressBar reminder={event?.reminder} />
      <h2 className="text-2xl font-semibold">Description</h2>
      {isSkeleton ? (
        <span className="w-full h-4 my-1 text-2xl font-bold bg-gray-400 animate-pulse" />
      ) : (
        <p className="text-justify">{event?.description}</p>
      )}
      <h3 className="text-2xl font-semibold">More Details</h3>
      <div className="grid max-w-full grid-flow-col overflow-auto">
        <div className="flex w-full gap-4">
          {generateCards({
            date: localDateMerged,
            occurrence: parseOccurrenceValue(
              event?.reminder?.[0]?.recurrence_type,
              event?.reminder?.[0]?.recurrence_value
            ),
            interval: parseIntervalValue(
              event?.reminder?.[0]?.interval_value,
              event?.reminder?.[0]?.interval_unit
            ),
            visibility: event?.is_public,
            notification_methods: event?.reminder?.[0]?.notification_methods,
            recurrence_type: event?.reminder?.[0]?.recurrence_type,
          }).map((info) =>
            isSkeleton ? (
              <EventDetailsSkeleton key={info.title} />
            ) : (
              <EventDetailsCard key={info.title} {...info} />
            )
          )}
          <div className="flex flex-col gap-1 p-2 rounded-md bg-muted text-primary border border-form-stroke/20 h-24 w-[15rem]">
            <div className="flex flex-row justify-between">
              <div className="flex flex-row items-center gap-1">
                <div className="flex items-center justify-center rounded-md p-0.5">
                  {eventTypeUtils.default.icon}
                </div>
                <p className="text-sm font-medium">Contact</p>
              </div>
            </div>
            <div className="h-full flex flex-col justify-center items-center gap-1">
              <p className="font-bold leading-snug line-clamp-3 text-lg text-center">
                {event?.contact?.full_name}
              </p>
            </div>
          </div>
        </div>
      </div>
      <footer className="flex w-full gap-4 fixed bottom-5 left-0 z-20 px-3 justify-center">
        <Button variant="secondary" className="flex gap-x-1" onClick={goToEdit}>
          <IconEdit size={20} className="text-white" />
          Edit Event
        </Button>

        <ConfirmDialog
          title="Are you sure you want to delete this event?"
          description="This action cannot be undone."
          triggerClassName={cn(
            "flex gap-x-1",
            buttonVariants({
              variant: "destructive",
            })
          )}
          onConfirm={() => onDeleteEvent({ event_id: event?.id || "" })}
        >
          <IconLogout2 size={20} className="text-white" />
          Delete Event
        </ConfirmDialog>
      </footer>
    </section>
  );
};
