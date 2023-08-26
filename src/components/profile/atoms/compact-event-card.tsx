import Link from "next/link";

import { eventTypeUtils } from "@/components/icons/event-type";
import TimeLeft from "@/components/shared/molecules/time-left";
import { buttonVariants } from "@/components/ui/button";
import { EventWithType } from "@/lib/entities.types";
import { cn } from "@/lib/utils";

interface CompactEventCardProps {
  event: EventWithType;
}

const CompactEventCard: React.FC<CompactEventCardProps> = ({ event }) => {
  return (
    <Link
      className={cn(
        buttonVariants({ variant: "event" }),
        "h-full justify-normal items-start focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary flex flex-col w-40 gap-1 p-2 rounded-md text-black cursor-pointer",
        eventTypeUtils[event.event_type?.value || "default"].className
      )}
      href={`/events/details/${event.id}`}
    >
      <div className="flex flex-row justify-between w-full">
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
      <div className="w-full">
        <p className="font-bold leading-snug sm:w-full overflow-hidden overflow-ellipsis whitespace-break-spaces line-clamp-3">
          {event.description}
        </p>
      </div>
    </Link>
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
