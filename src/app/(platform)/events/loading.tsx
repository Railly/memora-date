import { EventsSection } from "@/components/events/events.section";
import { SubHeader } from "@/components/shared/molecules/sub-header";
import { Badge } from "@/components/ui/badge";

export default function EventsLoading() {
  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col items-center w-full gap-6">
        <SubHeader title="My Events">
          <Badge variant="blue">
            <span className="animate-pulse">0 events</span>
          </Badge>
        </SubHeader>
        <EventsSection events={null} isSkeleton />
      </div>
    </div>
  );
}
