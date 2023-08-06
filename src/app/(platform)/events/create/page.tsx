import RscApiProvider from "@/services/rsc";
import CreateEventForm from "./create-event.form";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function CreateEventPage() {
  const rscApiProvider = new RscApiProvider({ cookies });
  const session = await rscApiProvider.auth.getSession();
  if (!session) {
    redirect("/sign-in");
  }
  const eventTypes = await rscApiProvider.event.getEventTypes();
  const contacts = await rscApiProvider.contact.getContacts();

  return (
    <CreateEventForm
      eventTypes={eventTypes.data}
      contacts={contacts.data}
      user={session?.user}
    />
  );
}
