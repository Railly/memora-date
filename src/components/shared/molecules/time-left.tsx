"use client";
import { useEffect, useState } from "react";
import { differenceInSeconds } from "date-fns";
import { cn } from "@/lib/utils";

interface TimeLeftProps {
  date: string | undefined;
}

const TimeLeft: React.FC<TimeLeftProps> = ({ date }) => {
  const isRecurring = true;
  const [timeLeft, setTimeLeft] = useState<string | null>(null);
  const [colorClass, setColorClass] = useState<string | null>(null);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    function calculateTimeLeft() {
      if (date) {
        const now = new Date();
        let nextEventDate = new Date(date);
        if (isRecurring && now > nextEventDate) {
          nextEventDate.setFullYear(now.getFullYear() + 1);
        }

        const totalSeconds = differenceInSeconds(nextEventDate, now);
        let unit = "seconds";
        let value = totalSeconds;

        if (totalSeconds >= 60) {
          value = Math.floor(totalSeconds / 60);
          unit = "minutes";
          if (value >= 60) {
            value = Math.floor(value / 60);
            unit = "hours";
            if (value >= 24) {
              value = Math.floor(value / 24);
              unit = "days";
              if (value >= 30) {
                value = Math.floor(value / 30);
                unit = "months";
                if (value >= 12) {
                  value = Math.floor(value / 12);
                  unit = "years";
                }
              }
            }
          }
        }

        switch (unit) {
          case "seconds":
          case "minutes":
            setColorClass("text-memora-pink");
            break;
          case "hours":
          case "days":
            setColorClass("text-memora-orange");
            break;
          case "months":
            setColorClass("text-memora-green");
            break;
          case "years":
            setColorClass("text-memora-blue");
            break;
          default:
            setColorClass("");
        }

        let nextUpdateInSeconds = 1;
        switch (unit) {
          case "years":
            nextUpdateInSeconds = 60 * 60 * 24 * 365;
            break;
          case "months":
            nextUpdateInSeconds = 60 * 60 * 24 * 30;
            break;
          case "days":
            nextUpdateInSeconds = 60 * 60 * 24;
            break;
          case "hours":
            nextUpdateInSeconds = 60 * 60;
            break;
          case "minutes":
            nextUpdateInSeconds = 60;
            break;
        }

        const unitPlural = value > 1 ? unit : unit.slice(0, -1);
        setTimeLeft(`${value} ${unitPlural}`);

        timeout = setTimeout(calculateTimeLeft, nextUpdateInSeconds * 1000);
      }
    }

    calculateTimeLeft();

    return () => clearTimeout(timeout);
  }, [date, isRecurring]);

  return <span className={cn(colorClass)}>{timeLeft || "0 seconds"} left</span>;
};

export default TimeLeft;
