import { Tailwind } from "@react-email/tailwind";
import { Heading } from "@react-email/heading";

interface EmailTemplateProps {
  event: any;
  reminder: any;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  event,
  reminder,
}) => (
  <Tailwind>
    <Heading className="px-6 py-4 text-black bg-rose-500" as="h2">
      {event.name}
    </Heading>
    <div className="px-6 py-4 text-gray-700 bg-gray-100">
      <p>{event.description}</p>
    </div>
  </Tailwind>
);

export default EmailTemplate;
