import AvatarSection from "@/components/profile/avatar.section";
import ProfileInfoSection from "@/components/profile/profile-info.section";
import SummaryEventSection from "@/components/profile/summary-event.section";
import { SubHeader } from "@/components/shared/molecules/sub-header";

export default function ProfileLoading() {
  return (
    <div className="flex flex-col w-full gap-6">
      <SubHeader title="Profile" />
      <div className="flex flex-col items-center w-full gap-8 mb-2">
        <AvatarSection session={null} isSkeleton />
        <ProfileInfoSection
          countEvent={null}
          countSaved={null}
          countContact={null}
          isSkeleton
        />
        <SummaryEventSection upcoming={null} past={null} isSkeleton />
      </div>
    </div>
  );
}
