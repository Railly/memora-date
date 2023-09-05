import { Tailwind } from "@react-email/tailwind";
import { Heading } from "@react-email/heading";

interface EmailTemplateProps {
  event: {
    name: string;
    description: string;
  };
  reminder: {
    reminder_type: string;
    time: string;
    date: Date;
    notificationMethod: string;
  };
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  event,
  reminder,
}) => (
  <Tailwind>
    <Heading className="px-6 py-4 text-black" as="h2">
      {`${event.name}: A Personal Reminder from Memora Date`}
    </Heading>
    <div className="px-6 py-4 text-gray-700 bg-gray-100">
      <p>Hey there,</p>
      <p>
        You set a reminder for {event.name}, and it&apos;s time to get ready.
      </p>
      <p>
        👉 What&apos;s This About?: {event.description}
        <br />
        🕒 Reminder Time: {reminder.time}
        <br />
        📆 Reminder Date: {reminder.date.toDateString()}
        <br />
        🔔 Type of Reminder: {reminder.reminder_type}
      </p>
      <p>
        Remember, time waits for no one. Take action and make the most of your
        day.
      </p>
      <p>
        Best, <br />
        Memora Date
      </p>
    </div>
  </Tailwind>
);

export default EmailTemplate;
