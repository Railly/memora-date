"use client";

import { Button } from "@/components/ui/button";
import { IconArrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

interface IHeaderProps {
  title: string;
  children?: React.ReactNode;
}

export const Header: React.FC<IHeaderProps> = ({ title, children }) => {
  const router = useRouter();
  const goBack = () => router.back();

  return (
    <header className="flex w-full justify-between mt-5">
      <div className="flex items-center gap-2">
        <Button
          type="button"
          onClick={goBack}
          className="p-0 px-2"
          variant="outline"
        >
          <IconArrowLeft size={20} />
        </Button>
        <h1 className="text-xl">{title}</h1>
      </div>
      {children}
    </header>
  );
};
