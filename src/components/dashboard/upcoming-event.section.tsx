import { EventWithType } from "@/types/entities";
import { Badge } from "../ui/badge";
import { IconBrandTinder } from "@tabler/icons-react";
import { eventTypeUtils } from "../icons/event-type";
import TimeLeft from "./molecules/time-left";

interface UpcomingEventSectionProps {
  events: EventWithType[] | null | undefined;
}

export default async function UpcomingEventSection({
  events,
}: UpcomingEventSectionProps) {
  return (
    <section className="flex flex-col w-full">
      <header className="flex justify-between">
        <div className="flex gap-1.5 items-center">
          <i className="p-0.5 rounded-full bg-memora-orange">
            <IconBrandTinder size={16} className="stroke-black" />
          </i>
          <span>Upcoming Events</span>
        </div>
        <Badge variant="blue">
          {events?.length} {events?.length === 1 ? "event" : "events"}
        </Badge>
      </header>
      <main className="w-full">
        <div className="flex flex-col w-full gap-4 mt-4">
          {events?.map((event) => (
            <div
              key={event.id}
              className="flex flex-col bg-[#191919] p-4 text-left border rounded-lg min-w-full border-primary"
            >
              <div className="flex justify-between">
                <Badge
                  icon={
                    eventTypeUtils[event.EventType?.value || "default"].icon
                  }
                  variant={
                    eventTypeUtils[event.EventType?.value || "default"].color
                  }
                >
                  {event.EventType?.value}
                </Badge>
                <TimeLeft date={event.date} />
              </div>
              <div className="flex flex-col w-full gap-2">
                <span className="text-2xl font-bold">{event.name}</span>
                <span className="w-full overflow-hidden overflow-ellipsis whitespace-nowrap">
                  {event.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </section>
  );
}
