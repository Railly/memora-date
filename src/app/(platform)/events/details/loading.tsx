import { EventsDetailsSection } from "@/components/events/details.section";
import { SubHeader } from "@/components/shared/molecules/sub-header";

export default function EventsDetailsLoading() {
  return (
    <div className="flex justify-center relative">
      <div className="flex flex-col w-full gap-6">
        <SubHeader title="Event details"></SubHeader>
        <EventsDetailsSection event={null} isSkeleton />
      </div>
    </div>
  );
}
