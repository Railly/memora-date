import RscApiProvider from "@/services/rsc";
import { cookies } from "next/headers";
import EditEventForm from "./edit-event.form";

type CreateEventPageProps = {
  params: { eventId: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function CreateEventPage(props: CreateEventPageProps) {
  const rscApiProvider = new RscApiProvider({ cookies });
  const session = await rscApiProvider.auth.getSession();
  const eventTypes = await rscApiProvider.event.getEventTypes();
  const contacts = await rscApiProvider.contact.getContacts();
  const event = await rscApiProvider.event.getEventById(props.params.eventId);

  return (
    <EditEventForm
      event={event?.data?.[0]}
      eventTypes={eventTypes.data}
      contacts={contacts.data}
      session={session}
    />
  );
}
