"use client";
import { EventWithType } from "@/lib/entities.types";
import { Badge } from "../ui/badge";
import { eventTypeUtils } from "../icons/event-type";
import { IconSpeakerphone } from "@tabler/icons-react";
import Countdown from "./molecules/countdown";
import ProgressBar from "./molecules/progress-bar";
import TimeLeft from "../shared/molecules/time-left";
import {
  EventDetailsCard,
  EventDetailsSkeleton,
} from "../events/molecules/details-card";
import {
  generateCards,
  parseIntervalValue,
  parseOccurrenceValue,
} from "@/lib/utils";
import { format } from "date-fns";
import { useMemo } from "react";

interface NextEventSectionProps {
  event: EventWithType | null | undefined;
  isSkeleton?: boolean;
}

export default function NextEventSection({
  event,
  isSkeleton,
}: NextEventSectionProps) {
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
    <section className="flex flex-col w-full gap-4">
      <header className="flex justify-between">
        <div className="flex gap-1.5 items-center">
          <i className="p-0.5 rounded-full bg-memora-yellow">
            <IconSpeakerphone size={16} className="stroke-black" />
          </i>
          <span>Next Event</span>
          <span>{" • "}</span>
          <TimeLeft reminder={event?.reminder} />
        </div>
        <Badge
          icon={eventTypeUtils[event?.event_type?.value || "default"].icon}
          variant={eventTypeUtils[event?.event_type?.value || "default"].color}
        >
          {event?.event_type?.value}
        </Badge>
      </header>
      {isSkeleton ? (
        <span className="w-20 h-6 my-1 text-2xl font-bold bg-gray-400 animate-pulse" />
      ) : (
        <h1 className="inline-block w-full text-2xl font-bold">
          {event?.name || "No upcoming event..."}
        </h1>
      )}
      <Countdown reminder={event?.reminder} />
      <ProgressBar reminder={event?.reminder} />
      <div className="hidden md:flex flex-col gap-4">
        {isSkeleton ? (
          <span className="w-20 h-6 my-1 text-2xl font-bold bg-gray-400 animate-pulse" />
        ) : (
          <h2 className="text-2xl font-semibold">Description</h2>
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
          <h3 className="text-2xl font-semibold">More Details</h3>
        )}
        <div className="grid max-w-full">
          <div className="flex w-full gap-4 flex-wrap">
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
            {/* Contact associated */}
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
      </div>
    </section>
  );
}
