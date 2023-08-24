"use client";

import { Session } from "@supabase/supabase-js";
import { UploadProfileImage } from "../forms/event/upload-profile-image";
import clientApiProvider from "@/services/client";
import { useToast } from "../ui/use-toast";

interface AvatarSectionProps {
  session: Session | null;
}

const AvatarSection: React.FC<AvatarSectionProps> = ({ session }) => {
  const { toast } = useToast();

  const userName =
    session?.user.user_metadata.full_name ?? session?.user.user_metadata.name;

  const onUpdateAvatar = async (avatar: { image: File }) => {
    const user = {
      user_id: session?.user.id ?? "",
      full_name: userName,
      avatar_url: session?.user.user_metadata.avatar_url ?? "",
    };

    try {
      const response = await clientApiProvider.profile.updateAvatar({
        avatar,
        user,
      });
      if (response.ok) {
        toast({
          title: "Avatar updated!",
          variant: "success",
        });
      }
      await clientApiProvider.auth.refreshSession();
    } catch (error) {
      console.log(error);
      toast({
        title: "Error updating avatar",
        variant: "danger",
      });
    }
  };

  const handleImageChange = (image: File) => {
    onUpdateAvatar({ image });
  };

  return (
    <section className="flex flex-col items-center gap-2">
      <div className="relative w-32 h-32">
        <UploadProfileImage
          image={session?.user.user_metadata.avatar_url ?? undefined}
          fullName={userName}
          onChange={handleImageChange}
          isProfile
        />
      </div>
      <div className="text-center">
        <p className="text-xl font-bold text-white">{userName}</p>
        <p className="text-sm font-medium text-zinc-500">
          {session?.user.user_metadata.email}
        </p>
      </div>
    </section>
  );
};

export default AvatarSection;
