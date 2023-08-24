import { cookies } from "next/headers";

import { EventsDetailsSection } from "@/components/events/details.section";
import { SubHeader } from "@/components/shared/molecules/sub-header";
import RscApiProvider from "@/services/rsc";

export default async function EventsDetailsPage({
  params,
}: {
  params: {
    eventId: string;
  };
}) {
  const rscApiProvider = new RscApiProvider({ cookies });
  const eventById = await rscApiProvider.event.getEventById(params.eventId);

  if (!eventById.data) {
    return null;
  }

  const event = eventById.data[0];

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-full gap-6">
        <SubHeader title="Event details"></SubHeader>
        <main>
          <EventsDetailsSection event={event} />
        </main>
      </div>
    </div>
  );
}
