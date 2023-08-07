import { EventWithType } from "@/lib/entities.types";
import { IconBrandTinder, IconNewsOff } from "@tabler/icons-react";
import EventCard, { EventCardSkeleton } from "../shared/molecules/event-card";
import { Badge } from "../ui/badge";
import EventsEmptyState from "../shared/molecules/events-empty-state";

interface UpcomingEventSectionProps {
  events: EventWithType[] | null | undefined;
  count: number | null;
  isSkeleton?: boolean;
}

export default function UpcomingEventSection({
  events,
  count,
  isSkeleton,
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
          {isSkeleton
            ? "Loading..."
            : `${count} ${count === 1 ? "event" : "events"}`}
        </Badge>
      </header>
      <main className="w-full">
        <div className="flex flex-col w-full gap-4 mt-4">
          {isSkeleton ? (
            Array.from({ length: 3 }, (_, index) => (
              <EventCardSkeleton key={index} />
            ))
          ) : (
            <>
              {count === 0 && <EventsEmptyState />}
              {events?.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </>
          )}
        </div>
      </main>
    </section>
  );
}
