import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const rawVariants = {
  default:
    "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
  secondary:
    "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
  destructive:
    "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
  purple:
    "border-transparent bg-memora-purple text-black shadow hover:bg-memora-purple/80",
  green:
    "border-transparent bg-memora-green text-black shadow hover:bg-memora-green/80",
  blue: "border-transparent bg-memora-blue text-black shadow hover:bg-memora-blue/80",
  yellow:
    "border-transparent bg-memora-yellow text-black shadow hover:bg-memora-yellow/80",
  pink: "border-transparent bg-memora-pink text-memora-pink-foreground shadow hover:bg-memora-pink/80",
  orange:
    "border-transparent bg-memora-orange text-black shadow hover:bg-memora-orange/80",
  imported: "border-transparent bg-memora-green text-black shadow",
  outline: "text-foreground",
};

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2 py-0.5 text-xxs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: rawVariants,
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode | null;
}

function Badge({ className, variant, icon, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {icon && <span className="mr-1">{icon}</span>}
      <span className="flex items-center text-xs">{children}</span>
    </div>
  );
}

export { Badge, badgeVariants };
