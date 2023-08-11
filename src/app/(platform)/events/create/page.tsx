import RscApiProvider from "@/services/rsc";
import CreateEventForm from "./create-event.form";
import { cookies } from "next/headers";

export default async function CreateEventPage() {
  const rscApiProvider = new RscApiProvider({ cookies });
  const session = await rscApiProvider.auth.getSession();
  const eventTypes = await rscApiProvider.event.getEventTypes();
  const contacts = await rscApiProvider.contact.getContacts();

  return (
    <CreateEventForm
      eventTypes={eventTypes.data}
      contacts={contacts.data}
      session={session}
    />
  );
}
