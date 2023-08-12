import React from "react";
import ProfileCounter from "./atoms/profile-counter";

interface ProfileInfoSectionProps {
  countEvent: number | null;
  countSaved: number | null;
  countContact: number | null;
}
const ProfileInfoSection: React.FC<ProfileInfoSectionProps> = ({
  countEvent,
  countSaved,
  countContact,
}) => {
  return (
    <section className="grid grid-cols-3 gap-14">
      <ProfileCounter quantity={countEvent} type="Events" />
      <ProfileCounter quantity={countSaved} type="Saved" />
      <ProfileCounter quantity={countContact} type="Contacts" />
    </section>
  );
};

export default ProfileInfoSection;
