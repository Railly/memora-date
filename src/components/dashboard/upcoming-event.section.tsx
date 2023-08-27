"use client";
import { EventWithType } from "@/lib/entities.types";
import { IconBrandTinder } from "@tabler/icons-react";
import { Badge } from "../ui/badge";
import { EventsSection } from "../events/events.section";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

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
  const pathname = usePathname();

  return (
    <section
      className={cn("w-full", {
        "hidden md:flex md:flex-col": pathname !== "/dashboard",
        "flex flex-col": pathname === "/dashboard",
      })}
    >
      <header className="flex justify-between pb-4">
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
      <EventsSection events={events} />
    </section>
  );
}
