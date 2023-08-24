import { EventWithType } from "@/lib/entities.types";
import { Badge } from "../ui/badge";
import { eventTypeUtils } from "../icons/event-type";
import { IconSpeakerphone } from "@tabler/icons-react";
import Countdown from "./molecules/countdown";
import ProgressBar from "./molecules/progress-bar";
import TimeLeft from "../shared/molecules/time-left";

interface NextEventSectionProps {
  event: EventWithType | null | undefined;
  isSkeleton?: boolean;
}

export default async function NextEventSection({
  event,
  isSkeleton,
}: NextEventSectionProps) {
  return (
    <section className="flex flex-col w-full gap-4">
      <header className="flex justify-between">
        <div className="flex gap-1.5 items-center">
          <i className="p-0.5 rounded-full bg-memora-yellow">
            <IconSpeakerphone size={16} className="stroke-black" />
          </i>
          <span>Next Event</span>
          <span>{" • "}</span>
          <TimeLeft reminder={event?.reminder} />
        </div>
        <Badge
          icon={eventTypeUtils[event?.event_type?.value || "default"].icon}
          variant={eventTypeUtils[event?.event_type?.value || "default"].color}
        >
          {event?.event_type?.value}
        </Badge>
      </header>
      {isSkeleton ? (
        <span className="w-20 h-6 my-1 text-2xl font-bold bg-gray-400 animate-pulse" />
      ) : (
        <h1 className="inline-block w-full text-2xl font-bold">
          {event?.name || "No upcoming event..."}
        </h1>
      )}
      <main>
        <Countdown reminder={event?.reminder} />
      </main>
      <footer>
        <ProgressBar reminder={event?.reminder} />
      </footer>
    </section>
  );
}
