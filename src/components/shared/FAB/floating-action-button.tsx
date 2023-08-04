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
      className="bg-memora-yellow rounded-full fixed bottom-6 right-6 z-50 hover:cursor-pointer"
      onClick={goTo}
    >
      <IconPlus size={60} className="stroke-black" />
    </i>
  );
};
