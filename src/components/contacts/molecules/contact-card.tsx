import { IconTrash } from "@tabler/icons-react";

import { ConfirmDialog } from "@/components/shared/atoms/confirm-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Contact } from "@/lib/entities.types";
import { ContactSchema } from "@/schemas/contact.schema";
import { IconPencil } from "@tabler/icons-react";
import { ContactDialog } from "./contact-dialog";
import { Spinner } from "@/components/shared/atoms/Spinner";

interface IContactCardProps {
  contact: Contact;
  onUpdateContact: (contact: ContactSchema, contact_id: string) => void;
  onDeleteContact: (contact_id: string, contact_image: string | null) => void;
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
    <div className="flex justify-center items-center bg-[#191919] p-3 border border-form-stroke/20 rounded-xl min-w-full">
      <Avatar className="flex justify-center items-center w-14 h-14">
        <AvatarImage
          src={`${
            contact?.image_url
              ? encodeURI(
                  `https://cgkjgmtdxmqoruwpyojn.supabase.co/storage/v1/object/public/profiles/${contact.image_url}`
                )
              : ""
          }`}
          alt="avatar"
        />
        <AvatarFallback className="text-3xl font-bold text-white">
          {contact?.image_url !== null ? (
            <div className="scale-50 pt-1">
              <Spinner />
            </div>
          ) : (
            getInitials(contact?.full_name)
          )}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col w-full py-2 px-4">
        <span className="text-xl font-bold">{contact?.full_name}</span>
        <ContactInfo value={!contact.email ? "-" : contact.email} />
        <ContactInfo value={!contact.phone ? "-" : contact.phone} />
      </div>
      <div className="flex flex-col justify-around h-full">
        <ContactDialog
          contact={contact}
          onUpdatedContact={onUpdateContact}
          triggerClassName="p-0.5 rounded-sm bg-white text-background cursor-pointer flex justify-center items-center p-1"
        >
          {<IconPencil size={20} />}
        </ContactDialog>
        <ConfirmDialog
          key={contact?.id}
          title="Are you sure you want to delete this contact?"
          description="This action cannot be undone."
          triggerClassName="p-0.5 rounded-sm bg-memora-pink cursor-pointer flex justify-center items-center p-1"
          onConfirm={() => onDeleteContact(contact.id, contact?.image_url)}
        >
          {<IconTrash size={20} />}
        </ConfirmDialog>
      </div>
    </div>
  );
};

export const ContactCardSkeleton: React.FC = () => {
  return (
    <div className="flex justify-center items-center bg-[#191919] p-3 border border-form-stroke/20 rounded-xl min-w-full">
      <Avatar className="flex justify-center items-center w-14 h-14">
        <AvatarFallback className="text-3l font-bold text-white">
          <div className="scale-50 pt-1">
            <Spinner />
          </div>
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col w-full gap-2 p-2">
        <span className="w-20 h-6 text-2xl font-bold bg-gray-400 animate-pulse" />
        <span className="w-full h-6 overflow-hidden bg-gray-400 overflow-ellipsis whitespace-nowrap animate-pulse" />
      </div>
    </div>
  );
};

export default ContactCard;
