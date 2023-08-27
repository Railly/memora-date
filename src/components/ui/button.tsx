import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      variant: {
        default:
          "bg-memora-green text-black text-base shadow hover:bg-memora-green/80",
        "default-2":
          "bg-foreground text-background shadow-sm hover:bg-foreground/80",
        destructive:
          "bg-destructive text-destructive-foreground text-base shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        sidebar: "bg-memora-gray text-white text-base hover:bg-memora-gray/90",
        "sidebar-destructive":
          "bg-memora-pink text-white text-base hover:bg-memora-pink/90",
        icon: "bg-transparent text-base",
        event:
          "flex flex-col w-full bg-muted p-4 text-left border rounded-lg border-form-stroke/20 hover:bg-muted/90 hover:border-primary cursor-pointer",
        "input-default": "bg-input border border-form-stroke/40",
        "input-error":
          "bg-input border border-red-500 transition ease-in-out duration-200",
        "input-green":
          "bg-input border border-emerald-500 transition ease-in-out duration-200",
        "input-pink":
          "bg-input border border-pink-500 transition ease-in-out duration-200",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
