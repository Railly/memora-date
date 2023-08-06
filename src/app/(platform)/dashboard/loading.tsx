import NextEventSection from "@/components/dashboard/next-event.section";
import UpcomingEventSection from "@/components/dashboard/upcoming-event.section";
import {
  ACTION_BUTTON_PATHS,
  FloatingActionButton,
} from "@/components/shared/atoms/FAB";

export default function DashboardLoading() {
  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col items-center w-full gap-6">
        <NextEventSection event={null} />
        <UpcomingEventSection events={null} count={0} isSkeleton />
        <FloatingActionButton to={ACTION_BUTTON_PATHS.EVENT_CREATOR} />
      </div>
    </div>
  );
}
