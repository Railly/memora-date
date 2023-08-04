import { EventWithType } from "@/types/entities";
import { IconBrandTinder } from "@tabler/icons-react";
import EventCard from "../shared/molecules/event-card";
import { Badge } from "../ui/badge";

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
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </main>
    </section>
  );
}
