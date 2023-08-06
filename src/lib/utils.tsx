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
