"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  differenceInMonths,
  differenceInYears,
} from "date-fns";
import { Event } from "@/lib/entities.types";
import { cn } from "@/lib/utils";

type Countdown = {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

interface CountdownProps {
  event: Event | null | undefined;
}

const Countdown: React.FC<CountdownProps> = ({ event }) => {
  const [countdown, setCountdown] = useState<Countdown | null>(null);
  const frameRef = useRef<number>();

  useEffect(() => {
    if (event?.date) {
      const eventDate = new Date(event.date);
      const updateCountdown = () => {
        const now = new Date();
        const nextEventDate = new Date(
          now.getFullYear() + 1,
          eventDate.getMonth(),
          eventDate.getDate()
        );

        setCountdown({
          years: differenceInYears(nextEventDate, now),
          months: differenceInMonths(nextEventDate, now) % 12,
          days: differenceInDays(nextEventDate, now) % 30,
          hours: differenceInHours(nextEventDate, now) % 24,
          minutes: differenceInMinutes(nextEventDate, now) % 60,
          seconds: differenceInSeconds(nextEventDate, now) % 60,
        });

        frameRef.current = requestAnimationFrame(updateCountdown);
      };

      frameRef.current = requestAnimationFrame(updateCountdown);

      return () => cancelAnimationFrame(frameRef.current as number);
    }
  }, [event]);

  return (
    <>
      <div className="flex flex-col justify-between bg-[#191919] px-10 py-2 text-center border rounded-lg min-w-max border-primary">
        <div className="flex flex-col items-center justify-center gap-2 md:gap-4">
          <div className="flex gap-8 md:gap-12">
            <CountDownUnit
              value={countdown?.years}
              label="years"
              upperValue={null}
            />
            <CountDownUnit
              value={countdown?.months}
              label="months"
              upperValue={countdown?.years}
            />
            <CountDownUnit
              value={countdown?.days}
              label="days"
              upperValue={countdown?.months}
            />
          </div>
          <div className="flex gap-8 md:gap-12">
            <CountDownUnit
              value={countdown?.hours}
              label="hours"
              upperValue={countdown?.days}
            />
            <CountDownUnit
              value={countdown?.minutes}
              label="minutes"
              upperValue={countdown?.hours}
            />
            <CountDownUnit
              value={countdown?.seconds}
              label="seconds"
              upperValue={countdown?.minutes}
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
}: {
  value: number | undefined;
  label: string;
  upperValue: number | null | undefined;
}) {
  const strValue = value?.toString().padStart(2, "0") || "00";

  return (
    <div
      className={cn("w-10 sm:w-12", {
        "text-[#595959]":
          strValue === "00" && (upperValue === null || upperValue === 0),
      })}
    >
      <span className="block text-4xl font-bold sm:text-5xl">{strValue}</span>
      <span className="block text-sm">{label}</span>
    </div>
  );
}

export default Countdown;
