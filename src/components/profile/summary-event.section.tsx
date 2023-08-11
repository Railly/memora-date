import { EventWithType } from "@/lib/entities.types";
import CompactEventCard from "./atoms/compact-event-card";
import SummaryBoxEvent from "./molecules/summary-box-event";

interface SummaryEventSectionProps {
  events: EventWithType[] | null;
}

const SummaryEventSection: React.FC<SummaryEventSectionProps> = ({
  events,
}) => {
  return (
    <section className="flex flex-col w-full gap-4">
      <SummaryBoxEvent title="Upcoming public events">
        {events?.map((event) => (
          <CompactEventCard key={event.id} event={event} />
        ))}
      </SummaryBoxEvent>
      <SummaryBoxEvent title="Past events">
        {events?.map((event) => (
          <CompactEventCard key={event.id} event={event} />
        ))}
      </SummaryBoxEvent>
    </section>
  );
};

export default SummaryEventSection;
