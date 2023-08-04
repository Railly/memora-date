import { eventTypeUtils } from "@/components/icons/event-type";
import { Badge } from "@/components/ui/badge";
import { EventWithType } from "@/types/entities";
import TimeLeft from "./time-left";

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

export default EventCard;
