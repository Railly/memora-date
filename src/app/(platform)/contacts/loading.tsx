import { ContactsSection } from "@/components/contacts/contacts-section";

export default function ContactLoading() {
  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col items-center w-full gap-6">
        <ContactsSection contacts={null} user={null} isSkeleton />
      </div>
    </div>
  );
}
