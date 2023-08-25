import { eventTypeUtils } from "@/components/icons/event-type";
import TimeLeft from "@/components/shared/molecules/time-left";
import { EventWithType } from "@/lib/entities.types";
import { cn } from "@/lib/utils";

interface CompactEventCardProps {
  event: EventWithType;
}

const CompactEventCard: React.FC<CompactEventCardProps> = ({ event }) => {
  return (
    <div
      className={cn(
        "flex flex-col w-40 gap-1 p-2 rounded-md text-black",
        eventTypeUtils[event.event_type?.value || "default"].className
      )}
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
    </div>
  );
};

export const CompactEventCardSkeleton = () => {
  return (
    <div className="flex flex-col w-40 gap-1 p-2 rounded-md h-28">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-1">
          <div className="flex items-center justify-center rounded-md">
            {eventTypeUtils["default"].icon}
          </div>
          <p className="text-sm font-medium">generic</p>
        </div>
        <div className="w-5 h-3 animate-pulse bg-foreground/20"></div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="h-4 animate-pulse bg-foreground/20"></div>
        <div className="h-4 animate-pulse bg-foreground/20"></div>
        <div className="h-4 animate-pulse bg-foreground/20"></div>
      </div>
    </div>
  );
};

export default CompactEventCard;
