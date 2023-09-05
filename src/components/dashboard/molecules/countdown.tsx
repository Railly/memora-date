"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  differenceInMonths,
  differenceInYears,
  add,
} from "date-fns";
import { EventWithType } from "@/lib/entities.types";
import { cn, getNextOccurrence } from "@/lib/utils";

type Countdown = {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

interface CountdownProps {
  reminder: EventWithType["reminder"] | null | undefined;
}

const Countdown: React.FC<CountdownProps> = ({ reminder }) => {
  const [countdown, setCountdown] = useState<Countdown | null>(null);

  useEffect(() => {
    if (reminder) {
      const updateCountdown = () => {
        const now = new Date();
        const nextEventDate = getNextOccurrence(reminder);
        if (!nextEventDate) return;

        if (now >= nextEventDate) {
          setCountdown({
            years: 0,
            months: 0,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
          });
          return;
        }

        setCountdown({
          years: differenceInYears(nextEventDate, now),
          months: differenceInMonths(nextEventDate, now) % 12,
          days: differenceInDays(nextEventDate, now) % 30,
          hours: differenceInHours(nextEventDate, now) % 24,
          minutes: differenceInMinutes(nextEventDate, now) % 60,
          seconds: differenceInSeconds(nextEventDate, now) % 60,
        });
      };

      const intervalId = setInterval(updateCountdown, 1000);
      return () => clearInterval(intervalId);
    }
  }, [reminder]);

  return (
    <>
      <div className="flex flex-col justify-between w-full bg-muted px-4 py-2 text-center border rounded-lg min-w-max border-form-stroke/20">
        <div className="flex flex-col items-center justify-center gap-2 md:gap-4">
          <div className="flex gap-4 md:gap-8 lg:gap-12">
            <CountDownUnit
              value={countdown?.years}
              label="years"
              upperValue={null}
              lowerValue={countdown?.months}
            />
            <CountDownUnit
              value={countdown?.months}
              label="months"
              upperValue={countdown?.years}
              lowerValue={countdown?.days}
            />
            <CountDownUnit
              value={countdown?.days}
              label="days"
              upperValue={countdown?.months}
              lowerValue={countdown?.hours}
            />
          </div>
          <div className="flex gap-4 md:gap-8 lg:gap-12">
            <CountDownUnit
              value={countdown?.hours}
              label="hours"
              upperValue={countdown?.days}
              lowerValue={countdown?.minutes}
            />
            <CountDownUnit
              value={countdown?.minutes}
              label="minutes"
              upperValue={countdown?.hours}
              lowerValue={countdown?.seconds}
            />
            <CountDownUnit
              value={countdown?.seconds}
              label="seconds"
              upperValue={countdown?.minutes}
              lowerValue={null}
            />
          </div>
        </div>
      </div>
    </>
  );
};

function CountDownUnit({
  value,
  label,
  upperValue,
  lowerValue,
}: {
  value: number | undefined;
  label: string;
  upperValue: number | null | undefined;
  lowerValue?: number | null | undefined;
}) {
  const strValue = value?.toString().padStart(2, "0") || "00";

  const isGray = useMemo(() => {
    if (upperValue === null && value === 0) return true;
    if (upperValue === null) return false;
    if (lowerValue === null) return false;
    if (value === 0) return true;
  }, [upperValue, lowerValue]);

  return (
    <div
      className={cn("w-10 sm:w-12", {
        "dark:text-[#595959] text-[#929191]": isGray,
      })}
    >
      <span className="block text-3xl font-bold sm:text-4xl lg:text-5xl">
        {strValue}
      </span>
      <span className="block text-sm">{label}</span>
    </div>
  );
}

export default Countdown;
