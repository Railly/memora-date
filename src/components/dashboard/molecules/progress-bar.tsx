"use client";
import { useEffect, useState } from "react";
import { differenceInDays } from "date-fns";
import { Event } from "@/lib/entities.types";

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
        className={"absolute h-full bg-memora-green"}
        style={{ width: `${progress}%` }}
      />
      <div
        className="absolute w-full leading-relaxed text-center"
        style={{
          color: "#191919",
          lineHeight: "2rem",
          width: `${progress}%`,
        }}
      >
        {`${Math.round(progress)}%`}
      </div>
    </div>
  );
};

export default ProgressBar;
