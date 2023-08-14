import { ContactsSection } from "@/components/contacts/contacts-section";

export default function ContactLoading() {
  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col items-center w-full gap-6">
        <ContactsSection
          initialContacts={null}
          user={
            {
              id: "1",
              email: "exampleo@gmail.com",
              phone: "+51 987 654 321",
            } as any
          }
          isSkeleton
        />
      </div>
    </div>
  );
}
