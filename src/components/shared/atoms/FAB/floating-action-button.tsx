"use client";

import { IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

interface IFloatingActionButtonProps {
  to?: string;
}

export const FloatingActionButton: React.FC<IFloatingActionButtonProps> = ({
  to,
}) => {
  const router = useRouter();
  const handleClick = () => {
    if (to) {
      router.push(to);
    }
  };
  return (
    <i
      className="fixed z-50 p-2 duration-300 rounded-full bg-memora-yellow bottom-6 right-6 hover:cursor-pointer hover:bg-[#D4A300] hover:scale-105 transition-all"
      onClick={handleClick}
    >
      <IconPlus size={35} className="stroke-black" />
    </i>
  );
};
