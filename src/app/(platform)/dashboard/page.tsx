import { cookies } from "next/headers";
import NextEventSection from "@/components/dashboard/next-event.section";
import UpcomingEventSection from "@/components/dashboard/upcoming-event.section";
import RscApiProvider from "@/services/rsc";
import {
  ACTION_BUTTON_PATHS,
  FloatingActionButton,
} from "@/components/shared/atoms/FAB";
import Sidebar from "@/components/layouts/sidebar";

export default async function DashBoardPage() {
  const rscApiProvider = new RscApiProvider({ cookies });
  const events = await rscApiProvider.event.getEvents();
  const nextEvent = events.data?.shift();
  const session = await rscApiProvider.auth.getSession();
  console.log({ events });

  return (
    // <div className="grid grid-cols-1 md:grid-cols-[1fr,3fr,2fr] gap-6 h-full">
    <div className="grid grid-cols-1 md:grid-cols-[minmax(18vw,_0.5fr)_minmax(33vw,_1fr)_minmax(33vw,_1fr)] gap-6 h-full">
      <Sidebar
        className="hidden h-[95vh] md:max-w-full bg-card z-50 md:block w-full"
        session={session}
        withinSheet={false}
      />
      <NextEventSection event={nextEvent} />
      <UpcomingEventSection
        events={events.data}
        count={
          events.count && events.count != 0 ? events.count - 1 : events.count
        }
      />
      <FloatingActionButton to={ACTION_BUTTON_PATHS.EVENT_CREATOR} />
    </div>
  );
}
