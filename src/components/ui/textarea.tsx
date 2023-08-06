import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const inputVariants = cva("bg-background text-foreground", {
  variants: {
    variant: {
      default: "bg-input border border-input-border border-opacity-40",
      error:
        "bg-input border border-red-500 transition ease-in-out duration-200",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof inputVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-40",
          "hover:border-memora-blue",
          "focus:outline-none focus:bg-transparent focus:ring-2 focus:ring-memora-blue/50",
          className,
          inputVariants({ variant })
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
