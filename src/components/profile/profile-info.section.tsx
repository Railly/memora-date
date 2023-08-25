import React from "react";
import ProfileCounter from "./atoms/profile-counter";

interface ProfileInfoSectionProps {
  countEvent: number | null;
  countSaved: number | null;
  countContact: number | null;
  isSkeleton?: boolean;
}
const ProfileInfoSection: React.FC<ProfileInfoSectionProps> = ({
  countEvent,
  countSaved,
  countContact,
  isSkeleton,
}) => {
  if (isSkeleton) {
    return (
      <section className="grid grid-cols-3 gap-14">
        <ProfileCounter quantity={null} type="Events" />
        <ProfileCounter quantity={null} type="Saved" />
        <ProfileCounter quantity={null} type="Contacts" />
      </section>
    );
  }

  return (
    <section className="grid grid-cols-3 gap-14">
      <ProfileCounter quantity={countEvent} type="Events" />
      <ProfileCounter quantity={countSaved} type="Saved" />
      <ProfileCounter quantity={countContact} type="Contacts" />
    </section>
  );
};

export default ProfileInfoSection;
