"use client";

import { Session } from "@supabase/supabase-js";
import { UploadProfileImage } from "../forms/event/upload-profile-image";
import clientApiProvider from "@/services/client";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

interface AvatarSectionProps {
  session: Session | null;
  isSkeleton?: boolean;
}

const AvatarSection: React.FC<AvatarSectionProps> = ({
  session,
  isSkeleton,
}) => {
  const router = useRouter();
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
      router.refresh();
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

  if (isSkeleton) {
    return <UserInformationSekeleton />;
  }

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
        <p className="text-xl font-bold">{userName}</p>
        <p className="text-sm font-medium text-foreground/80">
          {session?.user.user_metadata.email}
        </p>
      </div>
    </section>
  );
};

const UserInformationSekeleton = () => {
  return (
    <section className="flex flex-col items-center gap-3">
      <div className="w-32 h-32">
        <div className="w-full h-full rounded-full bg-foreground/20 animate-pulse" />
      </div>
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="h-4 w-28 bg-foreground/20 animate-pulse" />
        <div className="w-24 h-3 bg-foreground/20 animate-pulse" />
      </div>
    </section>
  );
};

export default AvatarSection;
