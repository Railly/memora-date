import { Tailwind } from "@react-email/tailwind";
import { Heading } from "@react-email/heading";

interface EmailTemplateProps {
  firstName: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
}) => (
  <Tailwind>
    <Heading className="px-6 py-4 text-black bg-rose-500" as="h2">
      Welcome {firstName}
    </Heading>
  </Tailwind>
);

export default EmailTemplate;
