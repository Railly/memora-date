import { IconTrash } from "@tabler/icons-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Contact } from "@/lib/entities.types";
import { ContactSchema } from "@/schemas/contact.schema";
import { ContactDialog } from "./contact-dialog";

interface IContactCardProps {
  contact: Contact;
  onUpdateContact: (contact: ContactSchema, contact_id: string) => void;
  onDeleteContact: (contact_id: string) => void;
}

const getInitials = (name?: string) => {
  if (!name) return "";
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
};

const ContactInfo = ({ value }: { value: string | null }) => (
  <span className="w-full overflow-hidden overflow-ellipsis whitespace-nowrap text-[#9D9D9D] text-sm">
    {value ?? "-"}
  </span>
);

const ContactCard: React.FC<IContactCardProps> = ({
  contact,
  onDeleteContact,
  onUpdateContact,
}) => {
  return (
    <div className="flex justify-center items-center bg-[#191919] p-3 border border-primary rounded-xl min-w-full">
      <Avatar className="flex justify-center items-center w-14 h-14">
        <AvatarImage src={contact.image_url ?? ""} alt="avatar" />
        <AvatarFallback className="text-3xl font-bold text-white">
          {getInitials(contact.full_name)}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col w-full py-2 px-4">
        <span className="text-xl font-bold">{contact.full_name}</span>
        <ContactInfo value={contact.email} />
        <ContactInfo value={contact.phone} />
      </div>
      <div className="flex flex-col justify-around h-full">
        <ContactDialog contact={contact} onUpdatedContact={onUpdateContact} />
        <i
          className="p-0.5 rounded-sm bg-[#EA5577] cursor-pointer"
          onClick={() => onDeleteContact(contact.id)}
        >
          <IconTrash size={24} />
        </i>
      </div>
    </div>
  );
};

export default ContactCard;
