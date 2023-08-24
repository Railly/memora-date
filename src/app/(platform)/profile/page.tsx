import { SubHeader } from "@/components/shared/molecules/sub-header";
import SummaryEventSection from "@/components/profile/summary-event.section";
import ProfileInfoSection from "@/components/profile/profile-info.section";
import AvatarSection from "@/components/profile/avatar.section";
import RscApiProvider from "@/services/rsc";
import { cookies } from "next/headers";

export default async function ProfilePage() {
  const rscApiProvider = new RscApiProvider({ cookies });
  const events = await rscApiProvider.event.getEvents();
  const contacts = await rscApiProvider.contact.getContacts();
  const session = await rscApiProvider.auth.getSession();

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-full gap-6">
        <SubHeader title="Profile" />
        <main className="flex flex-col items-center w-full gap-8 mb-2">
          <AvatarSection session={session} />
          <ProfileInfoSection
            countEvent={events?.count}
            countSaved={null}
            countContact={contacts?.count}
          />
          <SummaryEventSection upcoming={events?.data} past={null} />
        </main>
      </div>
    </div>
  );
}
