import {
  ACTION_BUTTON_PATHS,
  FloatingActionButton,
} from "@/components/shared/FAB";
import EventCard from "@/components/shared/molecules/event-card";
import { Header } from "@/components/shared/molecules/header";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Database } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { IconSearch } from "@tabler/icons-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function MyEventsPage() {
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

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center w-9/12 gap-8">
        <Header title="My Events">
          <Badge variant="blue">
            {events?.data?.length}{" "}
            {events?.data?.length === 1 ? "event" : "events"}
          </Badge>
        </Header>
        <main className="flex flex-col gap-4 w-full mb-2">
          <form>
            <Input
              id="search-events"
              placeholder="Search events"
              withIcon={<IconSearch size={20} />}
              variant={"default"}
            />
          </form>
          <div className="flex flex-col w-full gap-4">
            {events?.data?.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          <FloatingActionButton to={ACTION_BUTTON_PATHS.eventCreator} />
        </main>
      </div>
    </div>
  );
}
