import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import NextEventSection from "@/components/dashboard/next-event.section";
import UpcomingEventSection from "@/components/dashboard/upcoming-event.section";
import RscApiProvider from "@/services/rsc";
import {
  ACTION_BUTTON_PATHS,
  FloatingActionButton,
} from "@/components/shared/atoms/FAB";

export default async function DashBoardPage() {
  const rscApiProvider = new RscApiProvider({ cookies });
  const session = await rscApiProvider.auth.getSession();
  if (!session) {
    redirect("/sign-in");
  }
  const events = await rscApiProvider.event.getEvents();
  const nextEvent = events.data?.[0];
  console.log({
    events,
  });

  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col items-center w-9/12 gap-8">
        <NextEventSection event={nextEvent} />
        <UpcomingEventSection events={events.data} count={events.count} />
        <FloatingActionButton to={ACTION_BUTTON_PATHS.EVENT_CREATOR} />
      </div>
    </div>
  );
}
