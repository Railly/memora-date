/* eslint-disable @next/next/no-img-element */
export default function TestComponent({
  session,
  contacts,
  events,
  reminders,
  eventTypes,
}: {
  session: any;
  contacts: any;
  events: any;
  reminders: any;
  eventTypes: any;
}) {
  return (
    <div className="flex items-center justify-center flex-1 w-full min-h-screen gap-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div>
          <h2 className="text-xl font-bold">Profile</h2>
          {session?.user && (
            <div>
              <p>{session.user.email}</p>
              <p>{session.user.user_metadata.full_name}</p>
              <img
                className="rounded-full"
                src={session.user.user_metadata.avatar_url}
                width="100"
                height="100"
                alt="avatar"
              />
            </div>
          )}
        </div>

        <div>
          <h2 className="text-xl font-bold">Contacts</h2>
          <ul>
            {contacts.data?.map((contact: any) => (
              <li className="ml-4 list-disc" key={contact.id}>
                <h3>{contact.full_name}</h3>
                <h4>{contact.email}</h4>
                <p>{contact.phone}</p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold">Events</h2>
          <ul>
            {events.data?.map((event: any) => (
              <li className="ml-4 list-disc" key={event.id}>
                <h3>{event.name}</h3>
                <p>{event.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-bold">Event Types</h2>
          <ul>
            {eventTypes.data?.map((eventType: any) => (
              <li className="ml-4 list-disc" key={eventType.id}>
                <h3>{eventType.value}</h3>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold">Reminders</h2>
          <ul>
            {reminders.data?.map((reminder: any) => (
              <li className="ml-4 list-disc" key={reminder.id}>
                <h3>{reminder.frequency}</h3>
                <p>{reminder.notification_methods}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
