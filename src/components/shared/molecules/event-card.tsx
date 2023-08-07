import { eventTypeUtils } from "@/components/icons/event-type";
import { Badge } from "@/components/ui/badge";
import { EventWithType } from "@/lib/entities.types";
import TimeLeft from "./time-left";
import { IconSpeakerphone } from "@tabler/icons-react";

interface IEventCardProps {
  event: EventWithType;
}

const EventCard: React.FC<IEventCardProps> = ({ event }) => {
  return (
    <div className="flex flex-col bg-[#191919] p-4 text-left border rounded-lg min-w-full border-primary">
      <div className="flex justify-between">
        <Badge
          icon={eventTypeUtils[event.event_type?.value || "default"].icon}
          variant={eventTypeUtils[event.event_type?.value || "default"].color}
        >
          {event.event_type?.value}
        </Badge>
        <TimeLeft date={event.date} />
      </div>
      <div className="flex flex-col w-full py-2">
        <span className="text-2xl font-bold">{event.name}</span>
        <span className="w-full overflow-hidden overflow-ellipsis whitespace-nowrap">
          {event.description}
        </span>
      </div>
    </div>
  );
};

export const EventCardSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col bg-[#191919] p-4 text-left border rounded-lg min-w-full border-primary">
      <div className="flex justify-between">
        <Badge
          icon={<IconSpeakerphone size={16} className="stroke-black" />}
          variant="default"
        >
          event
        </Badge>
        <span>0 seconds left</span>
      </div>
      <div className="flex flex-col w-full gap-2 py-2">
        <span className="w-20 h-6 text-2xl font-bold bg-gray-400 animate-pulse" />
        <span className="w-full h-6 overflow-hidden bg-gray-400 overflow-ellipsis whitespace-nowrap animate-pulse" />
      </div>
    </div>
  );
};

export default EventCard;
