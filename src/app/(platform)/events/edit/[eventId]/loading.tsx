import EditEventForm from "./edit-event.form";

export default function CreateEventLoading() {
  return (
    <EditEventForm
      event={null}
      eventTypes={null}
      contacts={null}
      session={null}
      isSkeleton
    />
  );
}
