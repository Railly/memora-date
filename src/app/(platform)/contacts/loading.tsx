import { ContactsSection } from "@/components/contacts/contacts-section";
import { SubHeader } from "@/components/shared/molecules/sub-header";
import { Badge } from "@/components/ui/badge";

export default function ContactLoading() {
  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col items-center w-full gap-2">
        <SubHeader title="My Contacts">
          <Badge variant="yellow">
            <span className="animate-pulse">0 contacts</span>
          </Badge>
        </SubHeader>
        <ContactsSection contacts={null} user={null} isSkeleton />
      </div>
    </div>
  );
}
