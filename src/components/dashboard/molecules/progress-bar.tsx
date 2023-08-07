"use client";
import { useEffect, useState } from "react";
import { differenceInDays } from "date-fns";
import { Event } from "@/lib/entities.types";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  event: Event | null | undefined;
}
const ProgressBar: React.FC<ProgressBarProps> = ({ event }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (event?.date) {
      const now = new Date();
      const nextEventDate = new Date(
        now.getFullYear() + 1,
        new Date(event.date).getMonth(),
        new Date(event.date).getDate()
      );

      const total = differenceInDays(nextEventDate, new Date(event.date));
      const current = differenceInDays(now, new Date(event.date));

      setProgress((current * 100) / total);
    }
  }, [event]);

  return (
    <div className="relative w-full h-8 bg-[#191919] border border-primary rounded-lg overflow-hidden">
      <div
        style={{
          width: progress === 0 ? "100%" : `${progress}%`,
        }}
        className={cn(
          "absolute h-full transition-all duration-500 ease-in-out",
          {
            "bg-[#191919]": progress === 0,
            "bg-memora-green": progress < 50 && progress > 0,
            "bg-memora-orange": progress >= 50 && progress < 75,
            "bg-memora-pink": progress >= 75 && progress < 100,
            "bg-memora-blue": progress === 100,
          }
        )}
      />
      <div
        className={cn("absolute w-full text-center text-background", {
          "text-foreground": progress === 0,
        })}
        style={{
          lineHeight: "1.8rem",
          width: progress === 0 ? "100%" : `${progress}%`,
        }}
      >
        {`${Math.round(progress)}%`}
      </div>
    </div>
  );
};

export default ProgressBar;
