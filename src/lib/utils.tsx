import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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

export function getInitials(name: string) {
  const haveOnlyName = name.split(" ").length === 1;
  if (haveOnlyName) return name.slice(0, 2).toLocaleUpperCase();
  const [first, second] = name.split(" ");
  return `${first[0]}${second[0]}`;
}
