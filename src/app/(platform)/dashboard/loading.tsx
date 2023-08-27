import NextEventSection from "@/components/dashboard/next-event.section";
import UpcomingEventSection from "@/components/dashboard/upcoming-event.section";
import Sidebar from "@/components/layouts/sidebar";

export default function DashboardLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[minmax(18vw,_0.5fr)_minmax(33vw,_1fr)_minmax(33vw,_1fr)] gap-6 h-full">
      <Sidebar
        className="hidden h-[95vh] md:max-w-full bg-card z-50 md:block w-full"
        session={null}
        withinSheet={false}
      />
      <NextEventSection event={null} isSkeleton />
      <UpcomingEventSection events={null} count={0} isSkeleton />
    </div>
  );
}
