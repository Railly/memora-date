import { eventTypeUtils } from "@/components/icons/event-type";
import TimeLeft from "@/components/shared/molecules/time-left";
import { EventWithType } from "@/lib/entities.types";
import { cn } from "@/lib/utils";
import { IconMoodEmptyFilled } from "@tabler/icons-react";

interface CompactEventCardProps {
  event: EventWithType;
}

const CompactEventCard: React.FC<CompactEventCardProps> = ({ event }) => {
  if (!event) {
    return (
      <div className="flex flex-col justify-center h-10 text-zinc-500">
        <p className="flex gap-2">
          <IconMoodEmptyFilled />
          Nothing to show...
        </p>
      </div>
    );
  }

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
          <TimeLeft date={event.date} isShort={true} />
        </p>
      </div>
      <p className="font-bold leading-snug line-clamp-3">
        {event.description?.toLocaleUpperCase()}
      </p>
    </div>
  );
};

export default CompactEventCard;
