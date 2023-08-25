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
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, leftIcon, rightIcon, ...props }, ref) => {
    const leftIconPadding = {
      "pl-9 pr-3": leftIcon && !rightIcon,
      "px-3": !leftIcon && !rightIcon,
    };

    const rightIconPadding = {
      "pr-9 pl-3": rightIcon && !leftIcon,
      "px-3": !rightIcon && !leftIcon,
    };

    const bothIconsPadding = {
      "pl-9 pr-9": leftIcon && rightIcon,
    };

    return (
      <div className="relative w-full">
        {leftIcon && (
          <i className="absolute inset-y-0 flex items-center left-2">
            {leftIcon}
          </i>
        )}
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-background py-1 text-sm shadow-sm transition-colors file:border-0 file:text-primary file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-40",
            "hover:border-memora-blue",
            "focus:outline-none focus:bg-transparent focus:ring-2 focus:ring-memora-blue/50",
            className,
            inputVariants({ variant }),
            leftIconPadding,
            rightIconPadding,
            bothIconsPadding
          )}
          ref={ref}
          {...props}
          aria-describedby="input"
          aria-controls="input"
        />
        {rightIcon && (
          <i className="absolute inset-y-0 flex items-center right-2">
            {rightIcon}
          </i>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
