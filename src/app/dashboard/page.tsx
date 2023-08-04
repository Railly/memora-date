/* eslint-disable @next/next/no-img-element */
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { redirect } from "next/navigation";
import NextEventSection from "@/components/dashboard/next-event.section";
import UpcomingEventSection from "@/components/dashboard/upcoming-event.section";
import {
  ACTION_BUTTON_PATHS,
  FloatingActionButton,
} from "@/components/shared/FAB";

export default async function DashBoardPage() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/sign-in");
  }

  const events = await supabase
    .from("event")
    .select(
      `*,
      event_type (
        value
      )`
    )
    .order("date", { ascending: true });

  console.log({ events });

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
        <FloatingActionButton to={ACTION_BUTTON_PATHS.eventCreator} />
      </div>
    </div>
  );
}
