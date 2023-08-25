"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  differenceInMonths,
  differenceInYears,
} from "date-fns";
import { EventWithType } from "@/lib/entities.types";
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
  reminder: EventWithType["reminder"] | null | undefined;
}

const Countdown: React.FC<CountdownProps> = ({ reminder }) => {
  const [countdown, setCountdown] = useState<Countdown | null>(null);
  const frameRef = useRef<number>();

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
    if (localDateMerged) {
      const eventDate = new Date(localDateMerged);
      const updateCountdown = () => {
        const now = new Date();
        const nextEventDate = new Date(
          now.getFullYear(),
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
  }, [localDateMerged]);

  return (
    <>
      <div className="flex flex-col justify-between bg-muted px-10 py-2 text-center border rounded-lg min-w-max border-form-stroke/20">
        <div className="flex flex-col items-center justify-center gap-2 md:gap-4">
          <div className="flex gap-8 md:gap-12">
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
          <div className="flex gap-8 md:gap-12">
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

  const isGray =
    strValue === "00" &&
    (upperValue === null ||
      upperValue === 0 ||
      (lowerValue !== undefined && Number(value) <= Number(lowerValue)));

  return (
    <div
      className={cn("w-10 sm:w-12", {
        "dark:text-[#595959] text-[#929191]": isGray,
      })}
    >
      <span className="block text-4xl font-bold sm:text-5xl">{strValue}</span>
      <span className="block text-sm">{label}</span>
    </div>
  );
}

export default Countdown;
