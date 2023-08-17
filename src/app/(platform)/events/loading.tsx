import { EventsSection } from "@/components/events/events.section";

export default function EventsLoading() {
  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col items-center w-full gap-6">
        <EventsSection events={null} isSkeleton />
      </div>
    </div>
  );
}
