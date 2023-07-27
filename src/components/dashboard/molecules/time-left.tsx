"use client";
import { useEffect, useState } from "react";
import { differenceInSeconds } from "date-fns";
import { cn } from "@/lib/utils";

interface TimeLeftProps {
  date: string | undefined;
  // isRecurring: boolean;
}

const TimeLeft: React.FC<TimeLeftProps> = ({ date }) => {
  const isRecurring = true;
  const [timeLeft, setTimeLeft] = useState<string | null>(null);

  useEffect(() => {
    if (date) {
      const interval = setInterval(() => {
        const now = new Date();
        let nextEventDate = new Date(date);
        if (isRecurring && now > nextEventDate) {
          nextEventDate.setFullYear(now.getFullYear() + 1);
        }

        const totalSeconds = differenceInSeconds(nextEventDate, now);
        if (totalSeconds < 60) {
          setTimeLeft(`${totalSeconds} seconds`);
          return;
        }

        const totalMinutes = Math.floor(totalSeconds / 60);
        if (totalMinutes < 60) {
          setTimeLeft(`${totalMinutes} minutes`);
          return;
        }

        const totalHours = Math.floor(totalMinutes / 60);
        if (totalHours < 24) {
          setTimeLeft(`${totalHours} hours`);
          return;
        }

        const totalDays = Math.floor(totalHours / 24);
        if (totalDays < 30) {
          setTimeLeft(`${totalDays} days`);
          return;
        }

        const totalMonths = Math.floor(totalDays / 30);
        if (totalMonths < 12) {
          setTimeLeft(`${totalMonths} months`);
          return;
        }

        const totalYears = Math.floor(totalMonths / 12);
        setTimeLeft(`${totalYears} years`);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [date, isRecurring]);

  return (
    <span
      className={cn({
        "text-memora-pink":
          timeLeft &&
          (timeLeft.includes("seconds") || timeLeft.includes("minutes")),
        "text-memora-yellow":
          timeLeft && (timeLeft.includes("hours") || timeLeft.includes("days")),
        "text-memora-blue":
          timeLeft && timeLeft.includes("days") && !timeLeft.includes("months"),
        "text-memora-green":
          timeLeft &&
          timeLeft.includes("months") &&
          !timeLeft.includes("years"),
        "text-memora-orange": timeLeft && timeLeft.includes("years"),
      })}
    >
      {timeLeft} left
    </span>
  );
};

export default TimeLeft;
