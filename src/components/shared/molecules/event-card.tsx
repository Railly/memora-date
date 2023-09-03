import Link from "next/link";
import { IconSpeakerphone } from "@tabler/icons-react";

import { eventTypeUtils } from "@/components/icons/event-type";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { EventWithType } from "@/lib/entities.types";
import { cn } from "@/lib/utils";
import TimeLeft from "./time-left";

interface IEventCardProps {
  event: EventWithType;
  isSelected?: boolean;
  className?: string;
}

const EventCard: React.FC<IEventCardProps> = ({
  event,
  isSelected,
  className,
}) => {
  return (
    <Link
      className={cn(
        buttonVariants({
          variant: isSelected ? "event-selected" : "event",
        }),
        "h-full justify-between items-start focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary",
        className
      )}
      href={`/events/details/${event.id}`}
    >
      <div className="flex w-full justify-between">
        <Badge
          icon={eventTypeUtils[event.event_type?.value || "default"].icon}
          variant={eventTypeUtils[event.event_type?.value || "default"].color}
        >
          {event.event_type?.value}
        </Badge>
        <TimeLeft reminder={event.reminder} isSelected={isSelected} />
      </div>
      <div className="flex flex-col w-full py-2">
        <span className="text-2xl font-bold overflow-hidden overflow-ellipsis whitespace-nowrap">
          {event.name}
        </span>
        <span className="w-full overflow-hidden overflow-ellipsis whitespace-nowrap">
          {event.description}
        </span>
      </div>
    </Link>
  );
};

export const EventCardSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col bg-muted p-2 text-left border rounded-lg w-full border-form-stroke/20 hover:bg-muted/90 hover:border-primary h-full justify-between items-start">
      <div className="flex justify-between w-full">
        <Badge icon={<IconSpeakerphone size={16} />} variant="default">
          event
        </Badge>
        <span className="text-sm">0 seconds left</span>
      </div>
      <div className="flex flex-col w-full gap-2">
        <span className="w-20 h-6 text-2xl font-bold bg-gray-400 animate-pulse" />
        <span className="w-full h-6 overflow-hidden bg-gray-400 overflow-ellipsis whitespace-nowrap animate-pulse" />
      </div>
    </div>
  );
};

export default EventCard;
