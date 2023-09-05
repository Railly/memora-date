"use client";

import { useEffect, useMemo, useState } from "react";

import { EventWithType } from "@/lib/entities.types";
import { cn, getNextOccurrence } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  reminder: EventWithType["reminder"] | null | undefined;
}
const ProgressBar: React.FC<ProgressBarProps> = ({ reminder }) => {
  const [progress, setProgress] = useState(0);
  const intervalUnit = reminder?.[0]?.interval_unit;
  const intervalValue = reminder?.[0]?.interval_value;
  const reminderType = reminder?.[0]?.reminder_type;

  useEffect(() => {
    if (reminder) {
      const now = new Date();
      const createdDate = new Date(reminder[0]?.created_at || now);
      const nextOccurrence = getNextOccurrence(reminder);
      if (!nextOccurrence) return; // Handle appropriately

      if (now >= nextOccurrence) {
        setProgress(100);
        return;
      }

      const totalDuration = nextOccurrence.getTime() - createdDate.getTime();
      const elapsed = now.getTime() - createdDate.getTime();
      const newProgress = (elapsed / totalDuration) * 100;

      setProgress(Math.min(newProgress, 100));

      const intervalMultiplier = {
        Minute: 60000,
        Hour: 3600000,
        Day: 86400000,
        Week: 604800000,
        Month: 2592000000,
        Year: 31536000000,
      };

      const updateIncrement_one =
        intervalMultiplier[intervalUnit as keyof typeof intervalMultiplier];

      if (reminderType === "ONE_TIME") {
        const interval = setInterval(() => {
          const now = new Date();
          const elapsed = now.getTime() - createdDate.getTime();
          const newProgress = (elapsed / totalDuration) * 100;
          console.log({ newProgress });
          setProgress(Math.min(newProgress, 100));
        }, updateIncrement_one);

        return () => clearInterval(interval);
      }

      if (!nextOccurrence || !intervalUnit || !intervalValue) return; // Handle appropriately

      const updateIncrement_rec =
        intervalValue *
        intervalMultiplier[intervalUnit as keyof typeof intervalMultiplier];
      console.log({ updateIncrement_rec });

      if (reminderType === "RECURRING") {
        console.log("recurring", { updateIncrement_rec });
        const interval = setInterval(() => {
          console.log("recurring");
          const now = new Date();
          const elapsed = now.getTime() - createdDate.getTime();
          const newProgress = (elapsed / totalDuration) * 100;
          setProgress(Math.min(newProgress, 100));
        }, updateIncrement_rec);

        return () => clearInterval(interval);
      }
    }
  }, [reminder, reminderType, intervalUnit, intervalValue]);

  return (
    <div className="relative w-full h-8 bg-muted border border-form-stroke/20 rounded-lg overflow-hidden">
      <Progress
        value={progress}
        className={cn(
          "absolute bg-muted h-full transition-all duration-500 ease-in-out"
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
