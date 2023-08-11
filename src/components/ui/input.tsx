import * as React from "react";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const inputVariants = cva("bg-background text-foreground", {
  variants: {
    variant: {
      default: "bg-input border border-form-stroke/40",
      error:
        "bg-input border border-red-500 transition ease-in-out duration-200",
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
            "flex h-9 w-full rounded-md border border-input bg-background py-1 text-sm shadow-sm transition-colors file:border-0 file:text-primary file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-40",
            "hover:border-memora-blue",
            "focus:outline-none focus:bg-transparent focus:ring-2 focus:ring-memora-blue/50",
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
