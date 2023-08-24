"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IconArrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

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
    <section className={cn("flex justify-between w-full", className)}>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          onClick={goBack}
          className="p-0 px-2 bg-white"
          variant="outline"
        >
          <IconArrowLeft size={20} className="stroke-black" />
        </Button>
        <h1 className="text-xl">{title}</h1>
      </div>
      {children}
    </section>
  );
};
