import { cookies } from "next/headers";

import { EventsSection } from "@/components/events/events.section";
import {
  ACTION_BUTTON_PATHS,
  FloatingActionButton,
} from "@/components/shared/atoms/FAB";
import { SubHeader } from "@/components/shared/molecules/sub-header";
import { Badge } from "@/components/ui/badge";
import RscApiProvider from "@/services/rsc";

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
          <EventsSection initialEvents={events?.data} />
          <FloatingActionButton to={ACTION_BUTTON_PATHS.EVENT_CREATOR} />
        </main>
      </div>
    </div>
  );
}
