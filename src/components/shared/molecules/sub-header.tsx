"use client";

import { useRouter } from "next/navigation";
import { IconArrowLeft } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ISubHeaderProps {
  title: string;
  children?: React.ReactNode;
  className?: string;
}

export const SubHeader: React.FC<ISubHeaderProps> = ({
  title,
  children,
  className,
}) => {
  const router = useRouter();
  const goBack = () => router.back();

  return (
    <section
      className={cn("flex justify-between items-center w-full", className)}
    >
      <div className="flex items-center gap-2">
        <Button
          type="button"
          onClick={goBack}
          className="p-0 px-1 bg-white h-6"
          variant="outline"
        >
          <IconArrowLeft size={20} className="stroke-black" />
        </Button>
        <h1>{title}</h1>
      </div>
      {children}
    </section>
  );
};
