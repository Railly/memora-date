import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Session } from "@supabase/supabase-js";
import { getInitials } from "@/lib/utils";

interface AvatarSectionProps {
  session: Session | null;
}

const AvatarSection: React.FC<AvatarSectionProps> = ({ session }) => {
  const userName =
    session?.user.user_metadata.full_name ?? session?.user.user_metadata.name;

  return (
    <section className="flex flex-col items-center gap-2">
      <div className="w-32 h-32">
        <Avatar className="w-full h-full border-2 border-opacity-50 border-memora-gray">
          <AvatarImage
            src={session?.user.user_metadata.avatar_url}
            alt={`${userName}'s avatar image.`}
          />
          <AvatarFallback className="text-6xl">
            {getInitials(userName)}
          </AvatarFallback>
        </Avatar>
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
