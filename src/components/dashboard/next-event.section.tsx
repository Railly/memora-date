import { EventWithType } from "@/lib/entities.types";
import { Badge } from "../ui/badge";
import { eventTypeUtils } from "../icons/event-type";
import { IconSpeakerphone } from "@tabler/icons-react";
import Countdown from "./molecules/countdown";
import ProgressBar from "./molecules/progress-bar";
import TimeLeft from "../shared/molecules/time-left";

interface NextEventSectionProps {
  event: EventWithType | null | undefined;
}

export default async function NextEventSection({
  event,
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
          <TimeLeft date={event?.date} />
        </div>
        <Badge
          icon={eventTypeUtils[event?.event_type?.value || "default"].icon}
          variant={eventTypeUtils[event?.event_type?.value || "default"].color}
        >
          {event?.event_type?.value}
        </Badge>
      </header>
      <h1 className="inline-block w-full text-2xl font-bold">{event?.name}</h1>
      <main>
        <Countdown event={event} />
      </main>
      <footer>
        <ProgressBar event={event} />
      </footer>
    </section>
  );
}
