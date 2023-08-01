/* eslint-disable @next/next/no-img-element */
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import NextEventSection from "@/components/dashboard/next-event.section";
import UpcomingEventSection from "@/components/dashboard/upcoming-event.section";
import RscApiProvider from "@/services/rsc";

export default async function DashBoardPage() {
  const rscEventService = new RscApiProvider({ cookies });

  const session = await rscEventService.event.getSession();

  if (!session) {
    redirect("/sign-in");
  }

  const events = await rscEventService.event.getEvents();

  const nextEvent = events.data?.[0];
  // const reminders = await supabase.from("Reminder").select("*");
  // const contacts = await supabase.from("Contact").select("*");
  // const eventTypes = await supabase.from("EventType").select("*");

  /**
   * TODO: Find a better way for fetching the events and reminders
   * Just to retrieve the necessary data
   * Example: Fetch only 5 events, then fetch the respective reminders
   */

  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col items-center w-9/12 gap-8">
        {/* <TestComponent
        session={session}
        contacts={contacts}
        events={events}
        reminders={reminders}
        eventTypes={eventTypes}
      /> */}
        {/* <pre>{JSON.stringify(events, null, 2)}</pre> */}
        <NextEventSection event={nextEvent} />
        <UpcomingEventSection events={events.data} />
      </div>
    </div>
  );
}
