import * as React from "react";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const inputVariants = cva(" bg-background text-muted-foreground", {
  variants: {
    variant: {
      default: "bg-input border border-input-border border-opacity-50",
      error: "bg-background text-destructive-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  withIcon?: JSX.Element;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, withIcon, ...props }, ref) => {
    var inputPadding = {
      "pl-9 pr-3": withIcon,
      "px-3": !withIcon,
    };

    return (
      <div className="relative w-full">
        {withIcon && (
          <div className="absolute inset-y-0 flex items-center left-2">
            {withIcon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-background py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className,
            inputVariants({ variant }),
            inputPadding
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
