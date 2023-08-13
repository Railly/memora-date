import { IconNotebookOff } from "@tabler/icons-react";

import { ContactDialog } from "@/components/contacts/molecules/contact-dialog";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ContactSchema } from "@/schemas/contact.schema";

interface IContactsEmptyStateProps {
  onCreatedContact: (submit: ContactSchema) => void;
}

const ContactsEmptyState: React.FC<IContactsEmptyStateProps> = ({
  onCreatedContact,
}) => {
  return (
    <div className="flex flex-col items-center gap-2 w-full border border-primary bg-[#191919] rounded-lg p-6">
      <IconNotebookOff size={35} />
      <span className="text-2xl font-bold text-center">No Contacts</span>
      <span className="text-center">Create a contact to see it here</span>
      <ContactDialog
        onCreatedContact={onCreatedContact}
        triggerClassName={cn(
          buttonVariants({
            variant: "secondary",
          })
        )}
      >
        Create Contact
      </ContactDialog>
    </div>
  );
};

export default ContactsEmptyState;
