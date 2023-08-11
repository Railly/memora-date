import {
  ACTION_BUTTON_PATHS,
  FloatingActionButton,
} from "@/components/shared/atoms/FAB";
import EventCard from "@/components/shared/molecules/event-card";
import EventsEmptyState from "@/components/shared/molecules/events-empty-state";
import { SubHeader } from "@/components/shared/molecules/sub-header";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import RscApiProvider from "@/services/rsc";
import { IconSearch } from "@tabler/icons-react";
import { cookies } from "next/headers";

export default async function MyEventsPage() {
  const rscApiProvider = new RscApiProvider({ cookies });
  const events = await rscApiProvider.event.getEvents();

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-full gap-6">
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
            {events.count === 0 && <EventsEmptyState />}
          </div>
          <FloatingActionButton to={ACTION_BUTTON_PATHS.EVENT_CREATOR} />
        </main>
      </div>
    </div>
  );
}
