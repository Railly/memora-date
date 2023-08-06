"use client";
import { IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

interface IFloatingActionButtonProps {
  to: string;
}

export const FloatingActionButton: React.FC<IFloatingActionButtonProps> = ({
  to,
}) => {
  const router = useRouter();
  const goTo = () => router.push(to);
  return (
    <i
      className="fixed z-50 p-2 rounded-full bg-memora-yellow bottom-6 right-6 hover:cursor-pointer"
      onClick={goTo}
    >
      <IconPlus size={35} className="stroke-black" />
    </i>
  );
};
