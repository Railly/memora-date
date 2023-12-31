import { cookies } from "next/headers";

import { ContactsSection } from "@/components/contacts/contacts-section";
import { SubHeader } from "@/components/shared/molecules/sub-header";
import { Badge } from "@/components/ui/badge";
import RscApiProvider from "@/services/rsc";

export default async function MyContactsPage() {
  const rscApiProvider = new RscApiProvider({ cookies });

  const session = await rscApiProvider.auth.getSession();

  const contacts = await rscApiProvider.contact.getContacts();

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center w-full gap-6 md:gap-4">
        <SubHeader title="My Contacts">
          <Badge variant="yellow" className="h-6">
            {contacts?.data?.length}{" "}
            {contacts?.data?.length === 1 ? "contact" : "contacts"}
          </Badge>
        </SubHeader>
        <ContactsSection
          contacts={contacts.data}
          user={session?.user || null}
        />
      </div>
    </div>
  );
}
