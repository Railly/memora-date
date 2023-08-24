"use client";

import {
  IconBell,
  IconCalendar,
  IconChartLine,
  IconEdit,
  IconLogout2,
} from "@tabler/icons-react";
import { format, parseISO } from "date-fns";
import { useRouter } from "next/navigation";

import { eventTypeUtils } from "@/components/icons/event-type";
import { EventWithType } from "@/lib/entities.types";
import { cn } from "@/lib/utils";
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
import { useMemo } from "react";

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
        <h1 className="text-3xl">{event?.name}</h1>
      )}
      <div>
        {isSkeleton ? (
          <span className="inline-block w-16 h-6 text-2xl font-bold bg-gray-400 animate-pulse border-2 border-gray-400 rounded-md" />
        ) : (
          <Badge
            icon={eventTypeUtils[event?.event_type?.value || "default"].icon}
            variant={
              eventTypeUtils[event?.event_type?.value || "default"].color
            }
          >
            {event?.event_type?.value}
          </Badge>
        )}
      </div>
      <Countdown reminder={event?.reminder} />
      <ProgressBar reminder={event?.reminder} />
      {isSkeleton ? (
        <span className="w-20 h-6 my-1 text-2xl font-bold bg-gray-400 animate-pulse" />
      ) : (
        <h2 className="text-2xl">Description</h2>
      )}
      {isSkeleton ? (
        <>
          <span className="w-full h-6 my-1 text-2xl font-bold bg-gray-400 animate-pulse" />
          <span className="w-full h-6 my-1 text-2xl font-bold bg-gray-400 animate-pulse" />
          <span className="w-full h-6 my-1 text-2xl font-bold bg-gray-400 animate-pulse" />
        </>
      ) : (
        <p className="text-justify">{event?.description}</p>
      )}

      {isSkeleton ? (
        <span className="w-20 h-6 my-1 text-2xl font-bold bg-gray-400 animate-pulse" />
      ) : (
        <h3 className="text-2xl">More Details</h3>
      )}
      <div className="flex w-full gap-4 flex-wrap">
        {generateCards({
          date:
            `${
              localDateMerged &&
              format(parseISO(localDateMerged), "MMMM do, yyyy")
            }` || "No date",
          frequency: "Monthly",
          notify: "30 minutes",
        }).map((info) =>
          isSkeleton ? (
            <EventDetailsSkeleton key={info.title} />
          ) : (
            <EventDetailsCard key={info.title} {...info} />
          )
        )}
      </div>
      <div className="flex justify-evenly w-full mt-2">
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
              variant: "sidebar-destructive",
            })
          )}
          onConfirm={() => onDeleteEvent({ event_id: event?.id || "" })}
        >
          <IconLogout2 size={20} className="text-white" />
          Delete Event
        </ConfirmDialog>
      </div>
    </section>
  );
};

interface IGenerateCardsParams {
  date: string;
  frequency: string;
  notify: string;
}

const generateCards = ({ date, frequency, notify }: IGenerateCardsParams) => [
  {
    icon: <IconCalendar size={20} className="text-white" />,
    title: "Date",
    content: date,
  },
  {
    icon: <IconChartLine size={20} className="text-white" />,
    title: "Frequency",
    content: frequency,
  },
  {
    icon: <IconBell size={20} className="text-white" />,
    title: "Notify me",
    content: notify,
  },
];
