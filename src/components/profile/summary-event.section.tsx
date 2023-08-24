import { EventWithType } from "@/lib/entities.types";
import CompactEventCard from "./atoms/compact-event-card";
import SummaryBoxEvent from "./molecules/summary-box-event";
import { IconMoodEmptyFilled } from "@tabler/icons-react";

interface SummaryEventSectionProps {
  upcoming: EventWithType[] | null;
  past: EventWithType[] | null;
}

const SummaryEventSection: React.FC<SummaryEventSectionProps> = ({
  upcoming,
  past,
}) => {
  const hasUpcomingEvents = upcoming && upcoming.length > 0;
  const hasPastEvents = past && past.length > 0;

  return (
    <section className="flex flex-col w-full gap-4">
      <SummaryBoxEvent title="Upcoming public events">
        {hasUpcomingEvents ? (
          upcoming?.map((event) => (
            <CompactEventCard key={event.id} event={event} />
          ))
        ) : (
          <EmptySummaryEvent />
        )}
      </SummaryBoxEvent>
      <SummaryBoxEvent title="Past events">
        {hasPastEvents ? (
          past?.map((event) => (
            <CompactEventCard key={event.id} event={event} />
          ))
        ) : (
          <EmptySummaryEvent />
        )}
      </SummaryBoxEvent>
    </section>
  );
};

const EmptySummaryEvent = () => {
  return (
    <div className="flex flex-col justify-center h-10 text-foreground/80">
      <p className="flex gap-2">
        <IconMoodEmptyFilled />
        Nothing to show...
      </p>
    </div>
  );
};

export default SummaryEventSection;
