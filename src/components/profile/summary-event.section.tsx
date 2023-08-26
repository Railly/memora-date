import { EventWithType } from "@/lib/entities.types";
import CompactEventCard, {
  CompactEventCardSkeleton,
} from "./atoms/compact-event-card";
import SummaryBoxEvent from "./molecules/summary-box-event";
import { IconMoodEmptyFilled } from "@tabler/icons-react";

interface SummaryEventSectionProps {
  upcoming: EventWithType[] | null;
  past: EventWithType[] | null;
  isSkeleton?: boolean;
}

const SummaryEventSection: React.FC<SummaryEventSectionProps> = ({
  upcoming,
  past,
  isSkeleton,
}) => {
  const hasUpcomingEvents = upcoming && upcoming.length > 0;
  const hasPastEvents = past && past.length > 0;

  if (isSkeleton) {
    return (
      <section className="flex flex-col w-full gap-4">
        <SummaryBoxEvent title="Upcoming public events">
          {Array.from({ length: 6 }, (_, index) => (
            <CompactEventCardSkeleton key={index} />
          ))}
        </SummaryBoxEvent>
        <SummaryBoxEvent title="Past events">
          {Array.from({ length: 6 }, (_, index) => (
            <CompactEventCardSkeleton key={index} />
          ))}
        </SummaryBoxEvent>
      </section>
    );
  }

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
    <div className="flex flex-col w-40 justify-center text-foreground/80 h-[6.6rem] border-dashed border-foreground/80 border-2 rounded-md">
      <span className="flex justify-center gap-2">
        <IconMoodEmptyFilled />
        Nothing to show...
      </span>
    </div>
  );
};

export default SummaryEventSection;
