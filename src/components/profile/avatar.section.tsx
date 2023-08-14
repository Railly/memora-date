import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Session } from "@supabase/supabase-js";

interface AvatarSectionProps {
  session: Session | null;
}

const AvatarSection: React.FC<AvatarSectionProps> = ({ session }) => {
  const firstTwoLetters = (name: string) => {
    const haveOnlyName = name.split(" ").length === 1;
    if (haveOnlyName) return name.slice(0, 2).toLocaleUpperCase();
    const [first, second] = name.split(" ");
    return `${first[0]}${second[0]}`;
  };

  return (
    <section className="flex flex-col items-center gap-2">
      <div className="w-32 h-32">
        <Avatar className="w-full h-full border-2 border-opacity-50 border-memora-gray">
          <AvatarImage
            src={session?.user.user_metadata.avatar_url}
            alt={`${session?.user.user_metadata.full_name}'s avatar image.`}
          />
          <AvatarFallback className="text-6xl">
            {firstTwoLetters(
              session?.user.user_metadata.full_name ??
                session?.user.user_metadata.name
            )}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="text-center">
        <p className="text-xl font-bold text-white">
          {session?.user.user_metadata.full_name}
        </p>
        <p className="text-sm font-medium text-zinc-500">
          {session?.user.user_metadata.email}
        </p>
      </div>
    </section>
  );
};

export default AvatarSection;
