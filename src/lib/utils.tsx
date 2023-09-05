import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { EventWithType, Reminder } from "./entities.types";
import { add, format } from "date-fns";
import {
  IconBell,
  IconCalendar,
  IconChartLine,
  IconClock,
  IconEye,
  IconMoodEmpty,
  IconMoodEmptyFilled,
  IconRepeat,
} from "@tabler/icons-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function debugFormValues({
  data: values,
  toast,
  title = "You submitted the following values:",
}: {
  data: Record<string, any>;
  toast: any;
  title?: string;
}) {
  if (process.env.NODE_ENV !== "development") {
    return;
  }
  toast({
    title,
    description: (
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">{JSON.stringify(values, null, 2)}</code>
      </pre>
    ),
  });
}

export function getInitials(name: string | null) {
  if (!name)
    return <IconMoodEmptyFilled size={20} className="stroke-current" />;
  const haveOnlyName = name.split(" ").length === 1;
  if (haveOnlyName) return name.slice(0, 2).toLocaleUpperCase();
  const [first, second] = name.split(" ");
  return `${first[0]}${second[0]}`;
}

export const getImageUrl = (image: string) => {
  const baseUrl =
    "https://cgkjgmtdxmqoruwpyojn.supabase.co/storage/v1/object/public/profiles/";
  if (image.startsWith("http")) {
    return image;
  } else {
    return `${baseUrl}${image}`;
  }
};

export const parseOccurrenceValue = (
  type?: Reminder["recurrence_type"],
  value?: string | null
) => {
  if (!value) {
    return "No occurrence";
  }
  if (type === "After") {
    return `${type} ${value} ${Number(value) > 1 ? "times" : "time"}`;
  }
  return `${type} ${format(new Date(value), "EEE, MMM d yyyy")}`;
};

export const parseIntervalValue = (
  intervalValue?: number | null,
  intervalUnit?: string | null
) => {
  if (!intervalValue || !intervalUnit) {
    return "No interval";
  }

  return `Every ${intervalValue} ${intervalUnit}${
    intervalValue > 1 ? "s" : ""
  }`;
};

interface IGenerateCardsParams {
  date: string | null;
  occurrence: string;
  interval: string;
  visibility?: boolean;
  notification_methods?: string[];
  recurrence_type?: string | null;
}

export const generateCards = ({
  date,
  occurrence,
  interval,
  notification_methods,
  recurrence_type,
  visibility,
}: IGenerateCardsParams) => [
  {
    icon: <IconCalendar size={20} className="stroke-current" />,
    title: "Date",
    content: date ? format(new Date(date), "EEE, MMM d") : "No date",
  },
  {
    icon: <IconChartLine size={20} className="stroke-current" />,
    title: "Occurrence",
    content: occurrence,
  },
  {
    icon: <IconClock size={20} className="stroke-current" />,
    title: "Interval",
    content: interval,
  },
  {
    icon: <IconBell size={20} className="stroke-current" />,
    title: "Notification",
    content: notification_methods?.join("/") || <IconMoodEmpty />,
  },
  {
    icon: <IconRepeat size={20} className="stroke-current" />,
    title: "Recurrence",
    content: recurrence_type || <IconMoodEmpty />,
  },
  {
    icon: <IconEye size={20} className="stroke-current" />,
    title: "Visibility",
    content: visibility ? "Public" : "Private",
  },
];

export const generateCronExpression = (interval_unit: string) => {
  switch (interval_unit) {
    case "Minute":
      return "* * * * *";
    case "Hour":
      return "0 * * * *";
    case "Day":
      return "0 0 * * *";
    case "Week":
      return "0 0 * * 0";
    case "Month":
      return "0 0 1 * *";
    case "Year":
      return "0 0 1 1 *";
    default:
      throw new Error("Invalid interval_unit");
  }
};

export const getNextOccurrence = (reminder: EventWithType["reminder"]) => {
  if (!reminder?.length) return null;

  const { date, time, reminder_type, interval_unit, interval_value } =
    reminder[0];
  if (!date || !time) return null;

  const now = new Date();
  let nextEventDate = new Date(`${date}T${time}`);

  if (reminder_type === "RECURRING") {
    if (!interval_unit || !interval_value) return null;

    let loopSafetyCounter = 0; // Add a safety counter
    while (nextEventDate <= now) {
      if (loopSafetyCounter > 1000) {
        console.error("Infinite loop detected");
        return null;
      }

      nextEventDate = add(nextEventDate, {
        [interval_unit.toLowerCase()]: interval_value,
      });

      loopSafetyCounter++;
    }
  }

  return nextEventDate;
};
