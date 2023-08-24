"use client";

import { useEffect, useMemo, useState } from "react";

import { EventWithType } from "@/lib/entities.types";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  reminder: EventWithType["reminder"] | null | undefined;
}
const ProgressBar: React.FC<ProgressBarProps> = ({ reminder }) => {
  const [progress, setProgress] = useState(0);
  const intervalUnit = reminder?.[0]?.interval_unit;
  const intervalValue = reminder?.[0]?.interval_value;
  const reminderType = reminder?.[0]?.reminder_type;
  const createdAt = reminder?.[0]?.created_at;

  const localDateMerged = useMemo(() => {
    if (reminder?.length) {
      const date = reminder[0]?.date;
      const time = reminder[0]?.time;
      const rawDateMerged = new Date(`${date}T${time}`);
      return rawDateMerged.toLocaleString("en-US");
    }
    return null;
  }, [reminder]);

  useEffect(() => {
    if (localDateMerged) {
      let interval: NodeJS.Timeout;

      if (reminderType === "RECURRING" && intervalUnit && intervalValue) {
        const intervalMultiplier = {
          Minute: 60000,
          Hour: 3600000,
          Day: 86400000,
          Week: 604800000,
          Month: 2592000000, // Consider using a library like date-fns for more accurate calculation
          Year: 31536000000, // Same as above
        };

        const endDate = new Date(localDateMerged);
        const now = new Date();
        const totalDuration = endDate.getTime() - now.getTime();
        const updateIncrement =
          intervalValue *
          intervalMultiplier[intervalUnit as keyof typeof intervalMultiplier];

        interval = setInterval(() => {
          const elapsed = new Date().getTime() - now.getTime();
          const newProgress = (elapsed / totalDuration) * 100;
          setProgress(Math.min(newProgress, 100));
        }, updateIncrement);
      } else if (reminderType === "ONE_TIME" && createdAt) {
        setProgress(
          Math.min(
            ((new Date().getTime() - new Date(createdAt).getTime()) /
              (new Date(localDateMerged).getTime() -
                new Date(createdAt).getTime())) *
              100,
            100
          )
        );
      }
      return () => {
        clearInterval(interval);
      };
    }
  }, [localDateMerged, reminderType, intervalUnit, intervalValue]);

  return (
    <div className="relative w-full h-8 bg-muted border border-form-stroke/20 rounded-lg overflow-hidden">
      <div
        style={{
          width: progress === 0 ? "100%" : `${progress}%`,
        }}
        className={cn(
          "absolute h-full transition-all duration-500 ease-in-out",
          {
            "bg-muted": progress === 0,
            "bg-memora-green": progress < 50 && progress > 0,
            "bg-memora-orange": progress >= 50 && progress < 75,
            "bg-memora-pink": progress >= 75 && progress < 100,
            "bg-memora-blue": progress === 100,
          }
        )}
      />
      <div
        className={cn("absolute w-full text-black text-center", {
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
