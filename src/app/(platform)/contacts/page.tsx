import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { ContactsSection } from "@/components/contacts/contacts-section";

import { SubHeader } from "@/components/shared/molecules/sub-header";
import { Badge } from "@/components/ui/badge";
import RscApiProvider from "@/services/rsc";

export default async function MyContactsPage() {
  const rscApiProvider = new RscApiProvider({ cookies });

  const session = await rscApiProvider.auth.getSession();

  if (!session) {
    redirect("/sign-in");
  }

  const contacts = await rscApiProvider.contact.getContacts();

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center w-full gap-6">
        <SubHeader title="My Contacts">
          <Badge variant="yellow">
            {contacts?.data?.length}{" "}
            {contacts?.data?.length === 1 ? "contact" : "contacts"}
          </Badge>
        </SubHeader>
        <main className="flex flex-col w-full gap-4 mb-2">
          <ContactsSection
            initialContacts={contacts.data}
            user={session?.user}
          />
        </main>
      </div>
    </div>
  );
}
