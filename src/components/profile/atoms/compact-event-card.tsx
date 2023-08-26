"use client";

import { eventTypeUtils } from "@/components/icons/event-type";
import TimeLeft from "@/components/shared/molecules/time-left";
import { Button } from "@/components/ui/button";
import { EventWithType } from "@/lib/entities.types";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface CompactEventCardProps {
  event: EventWithType;
}

const CompactEventCard: React.FC<CompactEventCardProps> = ({ event }) => {
  const router = useRouter();
  const goToEvent = () => router.push(`/events/details/${event.id}`);

  return (
    <Button
      variant="event"
      className={cn(
        "h-full justify-between items-start focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary flex flex-col w-40 gap-1 p-2 rounded-md text-black cursor-pointer",
        eventTypeUtils[event.event_type?.value || "default"].className
      )}
      onClick={goToEvent}
    >
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center gap-1">
          <div className="flex items-center justify-center rounded-md">
            {eventTypeUtils[event.event_type?.value || "default"].icon}
          </div>
          <p className="text-sm font-medium">{event.event_type?.value}</p>
        </div>
        <p className="text-sm font-medium">
          <TimeLeft reminder={event.reminder} isShort />
        </p>
      </div>
      <p className="font-bold leading-snug line-clamp-3">{event.description}</p>
    </Button>
  );
};

export const CompactEventCardSkeleton = () => {
  return (
    <div className="flex flex-col w-40 gap-1 h-[6.6rem] p-2 rounded-md bg-foreground text-muted">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-1">
          <div className="flex items-center justify-center rounded-md">
            {eventTypeUtils["generic"].icon}
          </div>
          <p className="text-sm font-medium">generic</p>
        </div>
        <div className="w-5 h-3 bg-gray-400 animate-pulse"></div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="h-4 bg-gray-400 animate-pulse"></div>
        <div className="h-4 bg-gray-400 animate-pulse"></div>
        <div className="h-4 bg-gray-400 animate-pulse"></div>
      </div>
    </div>
  );
};

export default CompactEventCard;
