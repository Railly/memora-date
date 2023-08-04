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
  return (
    <i
      className="bg-memora-yellow rounded-full fixed bottom-6 right-6 z-50 hover:cursor-pointer"
      onClick={() => {
        router.push(to);
      }}
    >
      <IconPlus size={60} className="stroke-black" />
    </i>
  );
};
