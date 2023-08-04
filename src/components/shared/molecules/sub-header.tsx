"use client";

import { Button } from "@/components/ui/button";
import { IconArrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

interface ISubHeaderProps {
  title: string;
  children?: React.ReactNode;
}

export const SubHeader: React.FC<ISubHeaderProps> = ({ title, children }) => {
  const router = useRouter();
  const goBack = () => router.back();

  return (
    <section className="flex justify-between w-full">
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
    </section>
  );
};
