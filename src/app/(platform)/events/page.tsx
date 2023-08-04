import {
  ACTION_BUTTON_PATHS,
  FloatingActionButton,
} from "@/components/shared/FAB";
import EventCard from "@/components/shared/molecules/event-card";
import { SubHeader } from "@/components/shared/molecules/sub-header";
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
    <div className="flex justify-center pt-6">
      <div className="flex flex-col items-center w-9/12 gap-8">
        <SubHeader title="My Events">
          <Badge variant="blue">
            {events?.data?.length}{" "}
            {events?.data?.length === 1 ? "event" : "events"}
          </Badge>
        </SubHeader>
        <main className="flex flex-col w-full gap-4 mb-2">
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
          <FloatingActionButton to={ACTION_BUTTON_PATHS.EVENT_CREATOR} />
        </main>
      </div>
    </div>
  );
}
