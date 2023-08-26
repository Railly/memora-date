"use client";
import { useEffect, useMemo, useState } from "react";
import { differenceInSeconds } from "date-fns";
import { cn } from "@/lib/utils";
import { EventWithType } from "@/lib/entities.types";

interface TimeLeftProps {
  reminder: EventWithType["reminder"] | null | undefined;
  isShort?: boolean;
}

const TimeLeft: React.FC<TimeLeftProps> = ({ reminder, isShort }) => {
  const recurrenceType = reminder?.[0]?.recurrence_type;
  const [timeLeft, setTimeLeft] = useState<string | null>(null);
  const [colorClass, setColorClass] = useState<string | null>(null);
  const [timeSpan, setTimeSpan] = useState<string | null>(null);

  const localDateMerged = useMemo(() => {
    if (reminder?.length) {
      const date = reminder[0].date;
      const time = reminder[0].time;
      const rawDateMerged = new Date(`${date}T${time}`);
      return rawDateMerged.toLocaleString("en-US");
    }
    return null;
  }, [reminder]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    function calculateTimeLeft() {
      if (localDateMerged) {
        const now = new Date();
        let nextEventDate = new Date(localDateMerged);
        if (recurrenceType === "RECURRING" && now > nextEventDate) {
          switch (reminder?.[0].recurrence_value) {
            case "Minute":
              nextEventDate.setMinutes(nextEventDate.getMinutes() + 1);
              break;
            case "Hour":
              nextEventDate.setHours(nextEventDate.getHours() + 1);
              break;
            case "Day":
              nextEventDate.setDate(nextEventDate.getDate() + 1);
              break;
            case "Week":
              nextEventDate.setDate(nextEventDate.getDate() + 7);
              break;
            case "Month":
              nextEventDate.setMonth(nextEventDate.getMonth() + 1);
              break;
            case "Year":
              nextEventDate.setFullYear(nextEventDate.getFullYear() + 1);
              break;
          }
        }

        let totalSeconds = differenceInSeconds(nextEventDate, now);
        let isNegative = false;
        let unit = "seconds";
        let value = totalSeconds;
        if (totalSeconds < 0) {
          isNegative = true;
          totalSeconds = Math.abs(totalSeconds);
        }

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
            setColorClass("dark:text-memora-pink text-pink-600");
            break;
          case "hours":
          case "days":
            setColorClass("dark:text-memora-orange text-amber-600");
            break;
          case "months":
            setColorClass("dark:text-memora-green text-emerald-600");
            break;
          case "years":
            setColorClass("dark:text-memora-blue text-blue-600");
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
        if (isShort) {
          const unitAbbrevation = unit === "minutes" ? "min" : unit[0];
          setTimeLeft(`${value}${unitAbbrevation}`);
        } else {
          const unitPlural = value > 1 ? unit : unit.slice(0, -1);
          setTimeLeft(`${value} ${unitPlural}`);
        }

        if (isNegative) {
          value = -value;
          setTimeSpan("ago");
        } else {
          setTimeSpan("left");
        }

        timeout = setTimeout(calculateTimeLeft, nextUpdateInSeconds * 1000);
      }
    }

    calculateTimeLeft();

    return () => clearTimeout(timeout);
  }, [localDateMerged, recurrenceType]);

  if (isShort) {
    return <span>{timeLeft || "0s"}</span>;
  }

  return (
    <span className={cn(colorClass)}>
      {timeLeft || "0 seconds"} {timeSpan}
    </span>
  );
};

export default TimeLeft;
